"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPublicErc4337ClientSchema = void 0;
const zod_1 = require("zod");
const createPublicErc4337ClientSchema = () => zod_1.z.custom((provider) => {
    return (provider != null &&
        typeof provider === "object" &&
        "request" in provider &&
        "type" in provider &&
        "key" in provider &&
        "name" in provider);
});
exports.createPublicErc4337ClientSchema = createPublicErc4337ClientSchema;
//# sourceMappingURL=schema.js.map