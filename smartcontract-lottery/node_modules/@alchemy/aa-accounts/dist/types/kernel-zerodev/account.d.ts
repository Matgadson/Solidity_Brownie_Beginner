import { BaseSmartContractAccount, type BaseSmartAccountParams, type BatchUserOperationCallData, type SmartAccountSigner } from "@alchemy/aa-core";
import { type FallbackTransport, type Hex, type Transport } from "viem";
import { KernelBaseValidator } from "./validator/base.js";
export interface KernelSmartAccountParams<TTransport extends Transport | FallbackTransport = Transport> extends BaseSmartAccountParams<TTransport> {
    owner: SmartAccountSigner;
    index?: bigint;
    defaultValidator: KernelBaseValidator;
    validator?: KernelBaseValidator;
}
export declare class KernelSmartContractAccount<TTransport extends Transport | FallbackTransport = Transport> extends BaseSmartContractAccount<TTransport> {
    protected owner: SmartAccountSigner;
    private readonly index;
    private defaultValidator;
    private validator;
    constructor(params: KernelSmartAccountParams<TTransport>);
    getDummySignature(): Hex;
    encodeExecute(target: Hex, value: bigint, data: Hex): Promise<Hex>;
    encodeBatchExecute(txs: BatchUserOperationCallData): Promise<`0x${string}`>;
    signMessage(msg: Uint8Array | string): Promise<Hex>;
    protected getAccountInitCode(): Promise<Hex>;
    encodeExecuteDelegate(target: Hex, value: bigint, data: Hex): Promise<Hex>;
    signWithEip6492(msg: string | Uint8Array): Promise<Hex>;
    protected encodeExecuteAction(target: Hex, value: bigint, data: Hex, code: number): Hex;
    protected getFactoryInitCode(): Promise<Hex>;
}
//# sourceMappingURL=account.d.ts.map