import { SmartAccountProvider } from "@alchemy/aa-core";
import type { Hash, HttpTransport } from "viem";
export declare class KernelAccountProvider extends SmartAccountProvider<HttpTransport> {
    signMessage: (msg: string | Uint8Array) => Promise<Hash>;
}
