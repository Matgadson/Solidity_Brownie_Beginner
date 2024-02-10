import { z } from "zod";
export const createPublicErc4337ClientSchema = () => z.custom((provider) => {
    return (provider != null &&
        typeof provider === "object" &&
        "request" in provider &&
        "type" in provider &&
        "key" in provider &&
        "name" in provider);
});
//# sourceMappingURL=schema.js.map