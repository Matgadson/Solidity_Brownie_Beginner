"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultUserOperationFeeOptions = exports.minPriorityFeePerBidDefaults = exports.getDefaultSimpleAccountFactoryAddress = exports.getDefaultEntryPointAddress = void 0;
const chains_1 = require("viem/chains");
const getDefaultEntryPointAddress = (chain) => {
    switch (chain.id) {
        case chains_1.mainnet.id:
        case chains_1.sepolia.id:
        case chains_1.goerli.id:
        case chains_1.polygon.id:
        case chains_1.polygonMumbai.id:
        case chains_1.optimism.id:
        case chains_1.optimismGoerli.id:
        case chains_1.optimismSepolia.id:
        case chains_1.arbitrum.id:
        case chains_1.arbitrumGoerli.id:
        case chains_1.arbitrumSepolia.id:
        case chains_1.base.id:
        case chains_1.baseGoerli.id:
        case chains_1.baseSepolia.id:
            return "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";
    }
    throw new Error(`no default entrypoint contract address exists for ${chain.name}`);
};
exports.getDefaultEntryPointAddress = getDefaultEntryPointAddress;
const getDefaultSimpleAccountFactoryAddress = (chain) => {
    switch (chain.id) {
        case chains_1.mainnet.id:
        case chains_1.polygon.id:
        case chains_1.optimism.id:
        case chains_1.optimismSepolia.id:
        case chains_1.arbitrum.id:
        case chains_1.base.id:
        case chains_1.baseGoerli.id:
        case chains_1.baseSepolia.id:
        case chains_1.arbitrumSepolia.id:
            return "0x15Ba39375ee2Ab563E8873C8390be6f2E2F50232";
        case chains_1.sepolia.id:
        case chains_1.goerli.id:
        case chains_1.polygonMumbai.id:
        case chains_1.optimismGoerli.id:
        case chains_1.arbitrumGoerli.id:
            return "0x9406Cc6185a346906296840746125a0E44976454";
    }
    throw new Error(`no default simple account factory contract exists for ${chain.name}`);
};
exports.getDefaultSimpleAccountFactoryAddress = getDefaultSimpleAccountFactoryAddress;
exports.minPriorityFeePerBidDefaults = new Map([
    [chains_1.arbitrum.id, 10000000n],
    [chains_1.arbitrumGoerli.id, 10000000n],
    [chains_1.arbitrumSepolia.id, 10000000n],
]);
const getDefaultUserOperationFeeOptions = (chain) => {
    return {
        maxPriorityFeePerGas: {
            min: exports.minPriorityFeePerBidDefaults.get(chain.id) ?? 100000000n,
            percentage: 33,
        },
    };
};
exports.getDefaultUserOperationFeeOptions = getDefaultUserOperationFeeOptions;
//# sourceMappingURL=defaults.js.map