"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KernelAccountProvider = void 0;
const aa_core_1 = require("@alchemy/aa-core");
class KernelAccountProvider extends aa_core_1.SmartAccountProvider {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "signMessage", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async (msg) => {
                if (!this.account) {
                    throw new Error("account not connected!");
                }
                return this.account.signWithEip6492(msg);
            }
        });
    }
}
exports.KernelAccountProvider = KernelAccountProvider;
//# sourceMappingURL=provider.js.map