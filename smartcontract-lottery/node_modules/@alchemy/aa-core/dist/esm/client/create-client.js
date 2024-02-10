import { createPublicClient, http, } from "viem";
import { VERSION } from "../version.js";
export const erc4337ClientActions = (client) => {
    const clientAdapter = client;
    return {
        estimateUserOperationGas(request, entryPoint) {
            return clientAdapter.request({
                method: "eth_estimateUserOperationGas",
                params: [request, entryPoint],
            });
        },
        sendUserOperation(request, entryPoint) {
            return clientAdapter.request({
                method: "eth_sendUserOperation",
                params: [request, entryPoint],
            });
        },
        getUserOperationByHash(hash) {
            return clientAdapter.request({
                method: "eth_getUserOperationByHash",
                params: [hash],
            });
        },
        getUserOperationReceipt(hash) {
            return clientAdapter.request({
                method: "eth_getUserOperationReceipt",
                params: [hash],
            });
        },
        getSupportedEntryPoints() {
            return clientAdapter.request({
                method: "eth_supportedEntryPoints",
                params: [],
            });
        },
    };
};
export const createPublicErc4337FromClient = (client) => {
    return client.extend(erc4337ClientActions);
};
export const createPublicErc4337Client = ({ chain, rpcUrl, fetchOptions, }) => {
    const client = createPublicErc4337FromClient(createPublicClient({
        chain,
        transport: http(rpcUrl, {
            fetchOptions: {
                ...fetchOptions,
                headers: {
                    ...fetchOptions?.headers,
                    "Alchemy-AA-Sdk-Version": VERSION,
                },
            },
        }),
    }));
    return client;
};
//# sourceMappingURL=create-client.js.map