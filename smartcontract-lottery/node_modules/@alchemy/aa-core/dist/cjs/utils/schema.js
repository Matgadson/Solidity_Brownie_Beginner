"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PercentageSchema = exports.BigNumberishRangeSchema = exports.BigNumberishSchema = exports.HexSchema = exports.ChainSchema = void 0;
const viem_1 = require("viem");
const zod_1 = require("zod");
const index_js_1 = require("./index.js");
exports.ChainSchema = zod_1.z.custom((chain) => {
    if (chain == null ||
        !(typeof chain === "object") ||
        !("id" in chain) ||
        typeof chain.id !== "number") {
        return false;
    }
    try {
        return (0, index_js_1.getChain)(chain.id) !== undefined;
    }
    catch {
        return false;
    }
});
exports.HexSchema = zod_1.z.custom((val) => {
    return (0, viem_1.isHex)(val);
});
exports.BigNumberishSchema = zod_1.z.union([exports.HexSchema, zod_1.z.number(), zod_1.z.bigint()]);
exports.BigNumberishRangeSchema = zod_1.z
    .object({
    min: exports.BigNumberishSchema.optional(),
    max: exports.BigNumberishSchema.optional(),
})
    .strict();
exports.PercentageSchema = zod_1.z
    .object({
    percentage: zod_1.z.number().min(1).max(1000),
})
    .strict();
//# sourceMappingURL=schema.js.map