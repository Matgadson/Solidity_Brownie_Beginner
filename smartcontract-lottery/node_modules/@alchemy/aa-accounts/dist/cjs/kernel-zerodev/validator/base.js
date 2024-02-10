"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KernelBaseValidator = exports.ValidatorMode = void 0;
const viem_1 = require("viem");
var ValidatorMode;
(function (ValidatorMode) {
    ValidatorMode["sudo"] = "0x00000000";
    ValidatorMode["plugin"] = "0x00000001";
})(ValidatorMode || (exports.ValidatorMode = ValidatorMode = {}));
class KernelBaseValidator {
    constructor(params) {
        Object.defineProperty(this, "validatorAddress", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "mode", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "owner", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.validatorAddress = params.validatorAddress;
        this.mode = params.mode;
        this.owner = params.owner;
    }
    getAddress() {
        return this.validatorAddress;
    }
    async getOwnerAddress() {
        return this.owner.getAddress();
    }
    async signMessageWithValidatorParams(userOpHash) {
        if (this.mode === ValidatorMode.sudo ||
            this.mode === ValidatorMode.plugin) {
            try {
                const signature = await this.owner.signMessage(userOpHash);
                return (0, viem_1.concatHex)([this.mode, signature]);
            }
            catch (err) {
                console.log("Got Error - ", err.message);
                throw new Error("Validator failed to sign message");
            }
        }
        else {
            throw new Error("Validator mode not supported");
        }
    }
}
exports.KernelBaseValidator = KernelBaseValidator;
//# sourceMappingURL=base.js.map