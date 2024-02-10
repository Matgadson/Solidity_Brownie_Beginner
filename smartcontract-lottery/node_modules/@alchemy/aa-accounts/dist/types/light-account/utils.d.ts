import type { Address, Chain } from "viem";
/**
 * Utility method returning the default light account factory address given a {@link Chain} object
 *
 * @param chain - a {@link Chain} object
 * @returns a {@link Address} for the given chain
 * @throws if the chain doesn't have an address currently deployed
 */
export declare const getDefaultLightAccountFactoryAddress: (chain: Chain) => Address;
//# sourceMappingURL=utils.d.ts.map