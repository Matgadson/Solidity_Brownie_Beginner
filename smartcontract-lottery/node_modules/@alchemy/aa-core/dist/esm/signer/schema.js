import { z } from "zod";
export const SignerSchema = z.custom((signer) => {
    return (signer != null &&
        typeof signer === "object" &&
        "signerType" in signer &&
        "signMessage" in signer &&
        "signTypedData" in signer &&
        "getAddress" in signer &&
        "inner" in signer);
});
//# sourceMappingURL=schema.js.map