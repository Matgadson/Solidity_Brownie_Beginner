import type { Address } from "abitype";
import { type Chain, type Client, type FallbackTransport, type Hash, type Hex, type HttpTransport, type HttpTransportConfig, type PublicClient, type Transport } from "viem";
import type { UserOperationEstimateGasResponse, UserOperationReceipt, UserOperationRequest, UserOperationResponse } from "../types.js";
import type { PublicErc4337Client } from "./types.js";
export declare const erc4337ClientActions: (client: Client) => {
    estimateUserOperationGas(request: UserOperationRequest, entryPoint: string): Promise<UserOperationEstimateGasResponse>;
    sendUserOperation(request: UserOperationRequest, entryPoint: string): Promise<Hex>;
    getUserOperationByHash(hash: Hash): Promise<UserOperationResponse | null>;
    getUserOperationReceipt(hash: Hash): Promise<UserOperationReceipt | null>;
    getSupportedEntryPoints(): Promise<Address[]>;
};
export declare const createPublicErc4337FromClient: <T extends Transport | FallbackTransport = Transport>(client: PublicClient<T, Chain>) => PublicErc4337Client<T>;
export declare const createPublicErc4337Client: ({ chain, rpcUrl, fetchOptions, }: {
    chain: Chain;
    rpcUrl: string;
    fetchOptions?: HttpTransportConfig["fetchOptions"];
}) => PublicErc4337Client<HttpTransport>;
//# sourceMappingURL=create-client.d.ts.map