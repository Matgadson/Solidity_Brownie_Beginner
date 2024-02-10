import { SimpleSmartContractAccount, SmartAccountProvider, type SignTypedDataParams, type SmartAccountSigner } from "@alchemy/aa-core";
import { type Address, type FallbackTransport, type Hash, type Hex, type Transport } from "viem";
export declare class LightSmartContractAccount<TTransport extends Transport | FallbackTransport = Transport> extends SimpleSmartContractAccount<TTransport> {
    signTypedData(params: SignTypedDataParams): Promise<Hash>;
    getOwnerAddress(): Promise<Address>;
    static encodeTransferOwnership(newOwner: Address): Hex;
    static transferOwnership<TTransport extends Transport | FallbackTransport = Transport>(provider: SmartAccountProvider<TTransport> & {
        account: LightSmartContractAccount<TTransport>;
    }, newOwner: SmartAccountSigner, waitForTxn?: boolean): Promise<Hash>;
    protected getAccountInitCode(): Promise<`0x${string}`>;
}
