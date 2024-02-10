import { type FallbackTransport, type Hex, type Transport } from "viem";
import type { SmartAccountSigner } from "../signer/types.js";
import type { BatchUserOperationCallData } from "../types.js";
import { BaseSmartContractAccount } from "./base.js";
import type { SimpleSmartAccountParams } from "./types.js";
export declare class SimpleSmartContractAccount<TTransport extends Transport | FallbackTransport = Transport> extends BaseSmartContractAccount<TTransport> {
    protected owner: SmartAccountSigner;
    protected index: bigint;
    constructor(params: SimpleSmartAccountParams<TTransport>);
    getDummySignature(): `0x${string}`;
    encodeExecute(target: Hex, value: bigint, data: Hex): Promise<`0x${string}`>;
    encodeBatchExecute(txs: BatchUserOperationCallData): Promise<`0x${string}`>;
    signMessage(msg: Uint8Array | string): Promise<`0x${string}`>;
    protected getAccountInitCode(): Promise<`0x${string}`>;
}
//# sourceMappingURL=simple.d.ts.map