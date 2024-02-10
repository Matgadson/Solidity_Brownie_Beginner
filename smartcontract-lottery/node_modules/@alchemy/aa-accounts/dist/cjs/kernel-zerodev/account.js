"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KernelSmartContractAccount = void 0;
const aa_core_1 = require("@alchemy/aa-core");
const abitype_1 = require("abitype");
const viem_1 = require("viem");
const KernelAccountAbi_js_1 = require("./abis/KernelAccountAbi.js");
const KernelFactoryAbi_js_1 = require("./abis/KernelFactoryAbi.js");
const MultiSendAbi_js_1 = require("./abis/MultiSendAbi.js");
const utils_js_1 = require("./utils.js");
const base_js_1 = require("./validator/base.js");
class KernelSmartContractAccount extends aa_core_1.BaseSmartContractAccount {
    constructor(params) {
        super(params);
        Object.defineProperty(this, "owner", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "index", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "defaultValidator", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "validator", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.index = params.index ?? 0n;
        this.owner = params.owner;
        this.defaultValidator = params.defaultValidator;
        this.validator = params.validator ?? params.defaultValidator;
    }
    getDummySignature() {
        return "0x00000000b650d28e51cf39d5c0bb7db6d81cce5f0a77baba8bf8de587c0bc83fa70e374f3bfef2afb697dc5627c669de7dc13e96c85697e0f6aae2f2ebe227552d00cb181c";
    }
    async encodeExecute(target, value, data) {
        if (this.validator.mode !== base_js_1.ValidatorMode.sudo) {
            throw new Error("Validator Mode not supported");
        }
        else {
            return this.encodeExecuteAction(target, value, data, 0);
        }
    }
    async encodeBatchExecute(txs) {
        const multiSendData = (0, viem_1.concatHex)(txs.map((tx) => (0, utils_js_1.encodeCall)(tx)));
        return (0, viem_1.encodeFunctionData)({
            abi: MultiSendAbi_js_1.MultiSendAbi,
            functionName: "multiSend",
            args: [multiSendData],
        });
    }
    signMessage(msg) {
        const formattedMessage = typeof msg === "string" ? (0, viem_1.toBytes)(msg) : msg;
        return this.validator.signMessageWithValidatorParams(formattedMessage);
    }
    async getAccountInitCode() {
        return (0, viem_1.concatHex)([this.factoryAddress, await this.getFactoryInitCode()]);
    }
    async encodeExecuteDelegate(target, value, data) {
        return this.encodeExecuteAction(target, value, data, 1);
    }
    async signWithEip6492(msg) {
        try {
            const formattedMessage = typeof msg === "string" ? (0, viem_1.toBytes)(msg) : msg;
            let sig = await this.owner.signMessage((0, viem_1.toBytes)((0, viem_1.hashMessage)({ raw: formattedMessage })));
            if (!(await this.isAccountDeployed())) {
                sig = ((0, viem_1.encodeAbiParameters)((0, abitype_1.parseAbiParameters)("address, bytes, bytes"), [this.factoryAddress, await this.getFactoryInitCode(), sig]) +
                    "6492649264926492649264926492649264926492649264926492649264926492");
            }
            return sig;
        }
        catch (err) {
            console.error("Got Error - ", err.message);
            throw new Error("Message Signing with EIP6492 failed");
        }
    }
    encodeExecuteAction(target, value, data, code) {
        return (0, viem_1.encodeFunctionData)({
            abi: KernelAccountAbi_js_1.KernelAccountAbi,
            functionName: "execute",
            args: [target, value, data, code],
        });
    }
    async getFactoryInitCode() {
        try {
            return (0, viem_1.encodeFunctionData)({
                abi: KernelFactoryAbi_js_1.KernelFactoryAbi,
                functionName: "createAccount",
                args: [
                    this.defaultValidator.getAddress(),
                    await this.defaultValidator.getOwnerAddress(),
                    this.index,
                ],
            });
        }
        catch (err) {
            console.error("err occurred:", err.message);
            throw new Error("Factory Code generation failed");
        }
    }
}
exports.KernelSmartContractAccount = KernelSmartContractAccount;
//# sourceMappingURL=account.js.map