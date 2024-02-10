"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignerSchema = void 0;
const zod_1 = require("zod");
exports.SignerSchema = zod_1.z.custom((signer) => {
    return (signer != null &&
        typeof signer === "object" &&
        "signerType" in signer &&
        "signMessage" in signer &&
        "signTypedData" in signer &&
        "getAddress" in signer &&
        "inner" in signer);
});
//# sourceMappingURL=schema.js.map