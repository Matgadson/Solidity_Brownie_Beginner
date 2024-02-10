import { type ByteArray, type Hex, type WalletClient } from "viem";
import type { SignTypedDataParams } from "../account/types";
import type { SmartAccountSigner } from "./types";
export declare class WalletClientSigner implements SmartAccountSigner<WalletClient> {
    signerType: string;
    inner: WalletClient;
    constructor(client: WalletClient, signerType: string);
    getAddress: () => Promise<`0x${string}`>;
    readonly signMessage: (message: string | Hex | ByteArray) => Promise<`0x${string}`>;
    signTypedData: (params: SignTypedDataParams) => Promise<`0x${string}`>;
}
//# sourceMappingURL=wallet-client.d.ts.map