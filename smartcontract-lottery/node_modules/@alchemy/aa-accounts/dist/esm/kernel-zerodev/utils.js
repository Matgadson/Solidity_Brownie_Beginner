import { encodePacked, toBytes } from "viem";
export const encodeCall = (call) => {
    const data = toBytes(call.data);
    return encodePacked(["uint8", "address", "uint256", "uint256", "bytes"], [
        call.delegateCall ? 1 : 0,
        call.target,
        call.value ?? BigInt(0),
        BigInt(data.length),
        call.data,
    ]);
};
//# sourceMappingURL=utils.js.map