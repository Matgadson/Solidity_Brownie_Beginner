"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSignerCompatible = exports.isTypedDataSigner = exports.toTxResult = exports.sameString = void 0;
function sameString(str1, str2) {
    return str1.toLowerCase() === str2.toLowerCase();
}
exports.sameString = sameString;
function toTxResult(transactionResponse, options) {
    return {
        hash: transactionResponse.hash,
        options,
        transactionResponse
    };
}
exports.toTxResult = toTxResult;
function isTypedDataSigner(signer) {
    return signer.signTypedData !== undefined;
}
exports.isTypedDataSigner = isTypedDataSigner;
/**
 * Check if the signerOrProvider is compatible with `Signer`
 * @param signerOrProvider - Signer or provider
 * @returns true if the parameter is compatible with `Signer`
 */
function isSignerCompatible(signerOrProvider) {
    const candidate = signerOrProvider;
    const isSigntransactionCompatible = typeof candidate.signTransaction === 'function';
    const isSignMessageCompatible = typeof candidate.signMessage === 'function';
    const isGetAddressCompatible = typeof candidate.getAddress === 'function';
    return isSigntransactionCompatible && isSignMessageCompatible && isGetAddressCompatible;
}
exports.isSignerCompatible = isSignerCompatible;
//# sourceMappingURL=index.js.map