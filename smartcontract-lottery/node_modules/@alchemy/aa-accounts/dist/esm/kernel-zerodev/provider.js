import { SmartAccountProvider } from "@alchemy/aa-core";
import { KernelSmartContractAccount } from "./account.js";
export class KernelAccountProvider extends SmartAccountProvider {
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
//# sourceMappingURL=provider.js.map