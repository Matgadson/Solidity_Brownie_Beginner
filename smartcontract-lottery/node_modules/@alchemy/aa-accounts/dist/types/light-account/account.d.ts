import { SimpleSmartContractAccount, SmartAccountProvider, type SignTypedDataParams, type SmartAccountSigner } from "@alchemy/aa-core";
import { type Address, type FallbackTransport, type Hash, type Hex, type Transport } from "viem";
export declare class LightSmartContractAccount<TTransport extends Transport | FallbackTransport = Transport> extends SimpleSmartContractAccount<TTransport> {
    signTypedData(params: SignTypedDataParams): Promise<Hash>;
    /**
     * Returns the on-chain EOA owner address of the account.
     *
     * @returns {Address} the on-chain EOA owner of the account
     */
    getOwnerAddress(): Promise<Address>;
    /**
     * Encodes the transferOwnership function call using Light Account ABI.
     *
     * @param newOwner - the new owner of the account
     * @returns {Hex} the encoded function call
     */
    static encodeTransferOwnership(newOwner: Address): Hex;
    /**
     * Transfers ownership of the account to the newOwner on-chain and also updates the owner of the account.
     * Optionally waits for the transaction to be mined.
     *
     * @param provider - the provider to use to send the transaction
     * @param newOwner - the new owner of the account
     * @param waitForTxn - whether or not to wait for the transaction to be mined
     * @returns {Hash} the userOperation hash, or transaction hash if `waitForTxn` is true
     */
    static transferOwnership<TTransport extends Transport | FallbackTransport = Transport>(provider: SmartAccountProvider<TTransport> & {
        account: LightSmartContractAccount<TTransport>;
    }, newOwner: SmartAccountSigner, waitForTxn?: boolean): Promise<Hash>;
    protected getAccountInitCode(): Promise<`0x${string}`>;
}
//# sourceMappingURL=account.d.ts.map