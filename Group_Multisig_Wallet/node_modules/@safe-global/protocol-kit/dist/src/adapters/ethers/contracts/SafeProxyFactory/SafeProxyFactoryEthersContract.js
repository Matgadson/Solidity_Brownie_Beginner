"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SafeProxyFactoryEthersContract {
    constructor(contract) {
        this.contract = contract;
    }
    getAddress() {
        return this.contract.getAddress();
    }
    async proxyCreationCode() {
        return this.contract.proxyCreationCode();
    }
    async createProxy({ safeSingletonAddress, initializer, saltNonce, options, callback }) {
        if (BigInt(saltNonce) < 0)
            throw new Error('saltNonce must be greater than or equal to 0');
        if (options && !options.gasLimit) {
            options.gasLimit = await this.estimateGas('createProxyWithNonce', [safeSingletonAddress, initializer, saltNonce], {
                ...options
            });
        }
        const proxyAddress = this.contract
            .createProxyWithNonce(safeSingletonAddress, initializer, saltNonce, { ...options })
            .then(async (txResponse) => {
            if (callback) {
                callback(txResponse.hash);
            }
            const txReceipt = await txResponse.wait();
            const events = txReceipt?.logs;
            const proxyCreationEvent = events.find((event) => event?.eventName === 'ProxyCreation');
            if (!proxyCreationEvent || !proxyCreationEvent.args) {
                throw new Error('SafeProxy was not deployed correctly');
            }
            const proxyAddress = proxyCreationEvent.args[0];
            return proxyAddress;
        });
        return proxyAddress;
    }
    encode(methodName, params) {
        return this.contract.interface.encodeFunctionData(methodName, params);
    }
    async estimateGas(methodName, params, options) {
        const method = this.contract.getFunction(methodName);
        return (await method.estimateGas(...params, options)).toString();
    }
}
exports.default = SafeProxyFactoryEthersContract;
//# sourceMappingURL=SafeProxyFactoryEthersContract.js.map