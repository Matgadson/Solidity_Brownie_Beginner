import { concatHex } from "viem";
export var ValidatorMode;
(function (ValidatorMode) {
    ValidatorMode["sudo"] = "0x00000000";
    ValidatorMode["plugin"] = "0x00000001";
})(ValidatorMode || (ValidatorMode = {}));
export class KernelBaseValidator {
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
                return concatHex([this.mode, signature]);
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
//# sourceMappingURL=base.js.map