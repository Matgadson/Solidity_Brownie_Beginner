import type { Transport } from "viem";
import { z } from "zod";
import type { PublicErc4337Client, SupportedTransports } from "./types";
export declare const createPublicErc4337ClientSchema: <TTransport extends SupportedTransports = Transport>() => z.ZodType<PublicErc4337Client<TTransport>, z.ZodTypeDef, PublicErc4337Client<TTransport>>;
//# sourceMappingURL=schema.d.ts.map