"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LightSmartContractAccount = void 0;
const aa_core_1 = require("@alchemy/aa-core");
const viem_1 = require("viem");
const LightAccountAbi_js_1 = require("./abis/LightAccountAbi.js");
const LightAccountFactoryAbi_js_1 = require("./abis/LightAccountFactoryAbi.js");
class LightSmartContractAccount extends aa_core_1.SimpleSmartContractAccount {
    async signTypedData(params) {
        return this.owner.signTypedData(params);
    }
    async getOwnerAddress() {
        const callResult = await this.rpcProvider.call({
            to: await this.getAddress(),
            data: (0, viem_1.encodeFunctionData)({
                abi: LightAccountAbi_js_1.LightAccountAbi,
                functionName: "owner",
            }),
        });
        if (callResult.data == null) {
            throw new Error("could not get on-chain owner");
        }
        const decodedCallResult = (0, viem_1.decodeFunctionResult)({
            abi: LightAccountAbi_js_1.LightAccountAbi,
            functionName: "owner",
            data: callResult.data,
        });
        if (decodedCallResult !== (await this.owner.getAddress())) {
            throw new Error("on-chain owner does not match account owner");
        }
        return decodedCallResult;
    }
    static encodeTransferOwnership(newOwner) {
        return (0, viem_1.encodeFunctionData)({
            abi: LightAccountAbi_js_1.LightAccountAbi,
            functionName: "transferOwnership",
            args: [newOwner],
        });
    }
    static async transferOwnership(provider, newOwner, waitForTxn = false) {
        const data = this.encodeTransferOwnership(await newOwner.getAddress());
        const result = await provider.sendUserOperation({
            target: await provider.getAddress(),
            data,
        });
        provider.account.owner = newOwner;
        if (waitForTxn) {
            return provider.waitForUserOperationTransaction(result.hash);
        }
        return result.hash;
    }
    async getAccountInitCode() {
        return (0, viem_1.concatHex)([
            this.factoryAddress,
            (0, viem_1.encodeFunctionData)({
                abi: LightAccountFactoryAbi_js_1.LightAccountFactoryAbi,
                functionName: "createAccount",
                args: [await this.owner.getAddress(), 0n],
            }),
        ]);
    }
}
exports.LightSmartContractAccount = LightSmartContractAccount;
//# sourceMappingURL=account.js.map