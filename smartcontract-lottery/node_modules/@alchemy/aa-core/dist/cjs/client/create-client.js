"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPublicErc4337Client = exports.createPublicErc4337FromClient = exports.erc4337ClientActions = void 0;
const viem_1 = require("viem");
const version_js_1 = require("../version.js");
const erc4337ClientActions = (client) => {
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
exports.erc4337ClientActions = erc4337ClientActions;
const createPublicErc4337FromClient = (client) => {
    return client.extend(exports.erc4337ClientActions);
};
exports.createPublicErc4337FromClient = createPublicErc4337FromClient;
const createPublicErc4337Client = ({ chain, rpcUrl, fetchOptions, }) => {
    const client = (0, exports.createPublicErc4337FromClient)((0, viem_1.createPublicClient)({
        chain,
        transport: (0, viem_1.http)(rpcUrl, {
            fetchOptions: {
                ...fetchOptions,
                headers: {
                    ...fetchOptions?.headers,
                    "Alchemy-AA-Sdk-Version": version_js_1.VERSION,
                },
            },
        }),
    }));
    return client;
};
exports.createPublicErc4337Client = createPublicErc4337Client;
//# sourceMappingURL=create-client.js.map