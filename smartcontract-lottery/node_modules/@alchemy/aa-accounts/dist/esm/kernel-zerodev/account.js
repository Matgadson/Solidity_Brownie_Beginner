import { BaseSmartContractAccount, } from "@alchemy/aa-core";
import { parseAbiParameters } from "abitype";
import { concatHex, encodeAbiParameters, encodeFunctionData, hashMessage, toBytes, } from "viem";
import { KernelAccountAbi } from "./abis/KernelAccountAbi.js";
import { KernelFactoryAbi } from "./abis/KernelFactoryAbi.js";
import { MultiSendAbi } from "./abis/MultiSendAbi.js";
import { encodeCall } from "./utils.js";
import { KernelBaseValidator, ValidatorMode } from "./validator/base.js";
export class KernelSmartContractAccount extends BaseSmartContractAccount {
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
        if (this.validator.mode !== ValidatorMode.sudo) {
            throw new Error("Validator Mode not supported");
        }
        else {
            return this.encodeExecuteAction(target, value, data, 0);
        }
    }
    async encodeBatchExecute(txs) {
        const multiSendData = concatHex(txs.map((tx) => encodeCall(tx)));
        return encodeFunctionData({
            abi: MultiSendAbi,
            functionName: "multiSend",
            args: [multiSendData],
        });
    }
    signMessage(msg) {
        const formattedMessage = typeof msg === "string" ? toBytes(msg) : msg;
        return this.validator.signMessageWithValidatorParams(formattedMessage);
    }
    async getAccountInitCode() {
        return concatHex([this.factoryAddress, await this.getFactoryInitCode()]);
    }
    async encodeExecuteDelegate(target, value, data) {
        return this.encodeExecuteAction(target, value, data, 1);
    }
    async signWithEip6492(msg) {
        try {
            const formattedMessage = typeof msg === "string" ? toBytes(msg) : msg;
            let sig = await this.owner.signMessage(toBytes(hashMessage({ raw: formattedMessage })));
            if (!(await this.isAccountDeployed())) {
                sig = (encodeAbiParameters(parseAbiParameters("address, bytes, bytes"), [this.factoryAddress, await this.getFactoryInitCode(), sig]) +
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
        return encodeFunctionData({
            abi: KernelAccountAbi,
            functionName: "execute",
            args: [target, value, data, code],
        });
    }
    async getFactoryInitCode() {
        try {
            return encodeFunctionData({
                abi: KernelFactoryAbi,
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
//# sourceMappingURL=account.js.map