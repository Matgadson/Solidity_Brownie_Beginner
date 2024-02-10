import {
    LightSmartContractAccount,
    getDefaultLightAccountFactoryAddress,
} from "@alchemy/aa-accounts";
import { AlchemyProvider } from "@alchemy/aa-alchemy";
import { LocalAccountSigner, type Hex } from "@alchemy/aa-core";
import { sepolia } from "viem/chains";

const chain = sepolia;

// The private key of your EOA that will be the owner of Light Account
// Our recommendation is to store the private key in an environment variable
const PRIVATE_KEY = "0xa40ca5ecbc2df2525ef1494e2d1f3ff3a969f94ca59b79164149ffc756b6a509" as Hex;
const owner = LocalAccountSigner.privateKeyToAccountSigner(PRIVATE_KEY);

// Create a provider to send user operations from your smart account
const provider = new AlchemyProvider({
    // get your Alchemy API key at https://dashboard.alchemy.com
    apiKey: "E8uK-_ZFWy9M4m3OBtcmXdcYyqpjzduX",
    chain,
}).connect(
    (rpcClient) =>
        new LightSmartContractAccount({
            rpcClient,
            owner,
            chain,
            factoryAddress: getDefaultLightAccountFactoryAddress(chain),
        })
);

(async () => {
    // Fund your account address with ETH to send for the user operations
    // (e.g. Get Sepolia ETH at https://sepoliafaucet.com)
    console.log("Smart Account Address: ", await provider.getAddress()); // Log the smart account address
})();