import type { SmartAccountSigner } from "@alchemy/aa-core";
import { type Hex } from "viem";
export declare enum ValidatorMode {
    sudo = "0x00000000",
    plugin = "0x00000001"
}
export interface KernelBaseValidatorParams {
    validatorAddress: Hex;
    mode: ValidatorMode;
    owner: SmartAccountSigner;
}
export declare class KernelBaseValidator {
    readonly validatorAddress: Hex;
    mode: ValidatorMode;
    owner: SmartAccountSigner;
    constructor(params: KernelBaseValidatorParams);
    getAddress(): Hex;
    getOwnerAddress(): Promise<Hex>;
    signMessageWithValidatorParams(userOpHash: Uint8Array | string | Hex): Promise<Hex>;
}
//# sourceMappingURL=base.d.ts.map