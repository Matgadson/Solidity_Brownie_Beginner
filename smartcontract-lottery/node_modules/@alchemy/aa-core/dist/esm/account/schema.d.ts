import { type Transport } from "viem";
import z from "zod";
import type { SupportedTransports } from "../client/types";
export declare const createBaseSmartAccountParamsSchema: <TTransport extends SupportedTransports = Transport>() => z.ZodObject<{
    rpcClient: z.ZodUnion<[z.ZodString, z.ZodType<import("../client/types").PublicErc4337Client<TTransport>, z.ZodTypeDef, import("../client/types").PublicErc4337Client<TTransport>>]>;
    factoryAddress: z.ZodEffects<z.ZodString, `0x${string}`, string>;
    owner: z.ZodOptional<z.ZodType<import("../index.js").SmartAccountSigner<any>, z.ZodTypeDef, import("../index.js").SmartAccountSigner<any>>>;
    entryPointAddress: z.ZodOptional<z.ZodEffects<z.ZodString, `0x${string}`, string>>;
    chain: z.ZodType<import("viem").Chain, z.ZodTypeDef, import("viem").Chain>;
    accountAddress: z.ZodOptional<z.ZodEffects<z.ZodString, `0x${string}`, string>>;
    initCode: z.ZodOptional<z.ZodEffects<z.ZodString, `0x${string}`, string>>;
}, "strip", z.ZodTypeAny, {
    chain: import("viem/_types/types/chain.js").ChainConstants & import("viem/_types/types/chain.js").ChainConfig<import("viem").ChainFormatters | undefined>;
    rpcClient: (string | import("../client/types").PublicErc4337Client<TTransport>) & (string | import("../client/types").PublicErc4337Client<TTransport> | undefined);
    factoryAddress: `0x${string}`;
    owner?: import("../index.js").SmartAccountSigner<any> | undefined;
    entryPointAddress?: `0x${string}` | undefined;
    accountAddress?: `0x${string}` | undefined;
    initCode?: `0x${string}` | undefined;
}, {
    chain: import("viem/_types/types/chain.js").ChainConstants & import("viem/_types/types/chain.js").ChainConfig<import("viem").ChainFormatters | undefined>;
    rpcClient: (string | import("../client/types").PublicErc4337Client<TTransport>) & (string | import("../client/types").PublicErc4337Client<TTransport> | undefined);
    factoryAddress: string;
    owner?: import("../index.js").SmartAccountSigner<any> | undefined;
    entryPointAddress?: string | undefined;
    accountAddress?: string | undefined;
    initCode?: string | undefined;
}>;
export declare const SimpleSmartAccountParamsSchema: <TTransport extends SupportedTransports = Transport>() => z.ZodObject<{
    initCode: z.ZodOptional<z.ZodEffects<z.ZodString, `0x${string}`, string>>;
    chain: z.ZodType<import("viem").Chain, z.ZodTypeDef, import("viem").Chain>;
    entryPointAddress: z.ZodOptional<z.ZodEffects<z.ZodString, `0x${string}`, string>>;
    rpcClient: z.ZodUnion<[z.ZodString, z.ZodType<import("../client/types").PublicErc4337Client<TTransport>, z.ZodTypeDef, import("../client/types").PublicErc4337Client<TTransport>>]>;
    factoryAddress: z.ZodEffects<z.ZodString, `0x${string}`, string>;
    accountAddress: z.ZodOptional<z.ZodEffects<z.ZodString, `0x${string}`, string>>;
    owner: z.ZodType<import("../index.js").SmartAccountSigner<any>, z.ZodTypeDef, import("../index.js").SmartAccountSigner<any>>;
    index: z.ZodOptional<z.ZodBigInt>;
}, "strip", z.ZodTypeAny, {
    owner: import("../index.js").SmartAccountSigner<any>;
    chain: import("viem/_types/types/chain.js").ChainConstants & import("viem/_types/types/chain.js").ChainConfig<import("viem").ChainFormatters | undefined>;
    rpcClient: (string | import("../client/types").PublicErc4337Client<TTransport>) & (string | import("../client/types").PublicErc4337Client<TTransport> | undefined);
    factoryAddress: `0x${string}`;
    initCode?: `0x${string}` | undefined;
    entryPointAddress?: `0x${string}` | undefined;
    accountAddress?: `0x${string}` | undefined;
    index?: bigint | undefined;
}, {
    owner: import("../index.js").SmartAccountSigner<any>;
    chain: import("viem/_types/types/chain.js").ChainConstants & import("viem/_types/types/chain.js").ChainConfig<import("viem").ChainFormatters | undefined>;
    rpcClient: (string | import("../client/types").PublicErc4337Client<TTransport>) & (string | import("../client/types").PublicErc4337Client<TTransport> | undefined);
    factoryAddress: string;
    initCode?: string | undefined;
    entryPointAddress?: string | undefined;
    accountAddress?: string | undefined;
    index?: bigint | undefined;
}>;
