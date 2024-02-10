import { SimpleSmartContractAccount, SmartAccountProvider, } from "@alchemy/aa-core";
import { concatHex, decodeFunctionResult, encodeFunctionData, } from "viem";
import { LightAccountAbi } from "./abis/LightAccountAbi.js";
import { LightAccountFactoryAbi } from "./abis/LightAccountFactoryAbi.js";
export class LightSmartContractAccount extends SimpleSmartContractAccount {
    async signTypedData(params) {
        return this.owner.signTypedData(params);
    }
    async getOwnerAddress() {
        const callResult = await this.rpcProvider.call({
            to: await this.getAddress(),
            data: encodeFunctionData({
                abi: LightAccountAbi,
                functionName: "owner",
            }),
        });
        if (callResult.data == null) {
            throw new Error("could not get on-chain owner");
        }
        const decodedCallResult = decodeFunctionResult({
            abi: LightAccountAbi,
            functionName: "owner",
            data: callResult.data,
        });
        if (decodedCallResult !== (await this.owner.getAddress())) {
            throw new Error("on-chain owner does not match account owner");
        }
        return decodedCallResult;
    }
    static encodeTransferOwnership(newOwner) {
        return encodeFunctionData({
            abi: LightAccountAbi,
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
        return concatHex([
            this.factoryAddress,
            encodeFunctionData({
                abi: LightAccountFactoryAbi,
                functionName: "createAccount",
                args: [await this.owner.getAddress(), 0n],
            }),
        ]);
    }
}
//# sourceMappingURL=account.js.map