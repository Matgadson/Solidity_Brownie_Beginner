import { ethers } from 'ethers'
import { EthersAdapter } from '@safe-global/protocol-kit'
import dotenv from 'dotenv'

dotenv.config()

// https://chainlist.org/?search=sepolia&testnets=true
const RPC_URL = 'https://eth-sepolia.public.blastapi.io'
const provider = new ethers.JsonRpcProvider(RPC_URL)

// Initialize signers
const owner1Signer = new ethers.Wallet(process.env.OWNER_1_PRIVATE_KEY!, provider)
const owner2Signer = new ethers.Wallet(process.env.OWNER_2_PRIVATE_KEY!, provider)
const owner3Signer = new ethers.Wallet(process.env.OWNER_3_PRIVATE_KEY!, provider)

const ethAdapterOwner1 = new EthersAdapter({
    ethers,
    signerOrProvider: owner1Signer
})