import { type Address, type Hex, type SignTypedDataParams, type SmartAccountSigner } from "@alchemy/aa-core";
import { type HDAccount } from "viem/accounts";
export declare class MockSigner implements SmartAccountSigner<HDAccount> {
    inner: HDAccount;
    signerType: string;
    getAddress(): Promise<Address>;
    signMessage(_msg: Uint8Array | Hex | string): Promise<Hex>;
    signTypedData(_params: SignTypedDataParams): Promise<`0x${string}`>;
}
//# sourceMappingURL=mock-signer.d.ts.map