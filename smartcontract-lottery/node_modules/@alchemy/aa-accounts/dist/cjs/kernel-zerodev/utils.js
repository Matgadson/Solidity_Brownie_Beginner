"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeCall = void 0;
const viem_1 = require("viem");
const encodeCall = (call) => {
    const data = (0, viem_1.toBytes)(call.data);
    return (0, viem_1.encodePacked)(["uint8", "address", "uint256", "uint256", "bytes"], [
        call.delegateCall ? 1 : 0,
        call.target,
        call.value ?? BigInt(0),
        BigInt(data.length),
        call.data,
    ]);
};
exports.encodeCall = encodeCall;
//# sourceMappingURL=utils.js.map