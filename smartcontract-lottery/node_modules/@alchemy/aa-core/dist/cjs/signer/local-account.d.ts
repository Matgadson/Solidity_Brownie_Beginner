import { type HDAccount, type Hex, type LocalAccount, type PrivateKeyAccount } from "viem";
import type { SignTypedDataParams } from "../account/types.js";
import type { SmartAccountSigner } from "./types.js";
export declare class LocalAccountSigner<T extends HDAccount | PrivateKeyAccount | LocalAccount> implements SmartAccountSigner<T> {
    inner: T;
    signerType: string;
    constructor(inner: T);
    readonly signMessage: (msg: string | Uint8Array) => Promise<`0x${string}`>;
    readonly signTypedData: (params: SignTypedDataParams) => Promise<`0x${string}`>;
    readonly getAddress: () => Promise<`0x${string}`>;
    static mnemonicToAccountSigner(key: string): LocalAccountSigner<HDAccount>;
    static privateKeyToAccountSigner(key: Hex): LocalAccountSigner<PrivateKeyAccount>;
}
