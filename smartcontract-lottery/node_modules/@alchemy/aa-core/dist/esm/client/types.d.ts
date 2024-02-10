import type { Address } from "abitype";
import type { Chain, Client, FallbackTransport, Hash, HttpTransport, PublicActions, PublicRpcSchema, Transport } from "viem";
import type { UserOperationEstimateGasResponse, UserOperationReceipt, UserOperationRequest, UserOperationResponse } from "../types.js";
export type SupportedTransports = Transport | FallbackTransport | HttpTransport;
export type Erc4337RpcSchema = [
    {
        Method: "eth_sendUserOperation";
        Parameters: [UserOperationRequest, Address];
        ReturnType: Hash;
    },
    {
        Method: "eth_estimateUserOperationGas";
        Parameters: [UserOperationRequest, Address];
        ReturnType: UserOperationEstimateGasResponse;
    },
    {
        Method: "eth_getUserOperationReceipt";
        Parameters: [Hash];
        ReturnType: UserOperationReceipt | null;
    },
    {
        Method: "eth_getUserOperationByHash";
        Parameters: [Hash];
        ReturnType: UserOperationResponse | null;
    },
    {
        Method: "eth_supportedEntryPoints";
        Parameters: [];
        ReturnType: Address[];
    }
];
export type Erc4337Actions = {
    estimateUserOperationGas(request: UserOperationRequest, entryPoint: Address): Promise<UserOperationEstimateGasResponse>;
    sendUserOperation(request: UserOperationRequest, entryPoint: Address): Promise<Hash>;
    getUserOperationByHash(hash: Hash): Promise<UserOperationResponse | null>;
    getUserOperationReceipt(hash: Hash): Promise<UserOperationReceipt | null>;
    getSupportedEntryPoints(): Promise<Address[]>;
};
export type PublicErc4337Client<T extends SupportedTransports = Transport> = Client<T, Chain, undefined, [
    ...PublicRpcSchema,
    ...Erc4337RpcSchema
], PublicActions<T, Chain> & Erc4337Actions>;
