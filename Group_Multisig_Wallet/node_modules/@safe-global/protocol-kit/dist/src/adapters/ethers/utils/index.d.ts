import { ContractTransactionResponse, Provider, AbstractSigner } from 'ethers';
import { EthersTransactionOptions, EthersTransactionResult } from '../types';
export declare function sameString(str1: string, str2: string): boolean;
export declare function toTxResult(transactionResponse: ContractTransactionResponse, options?: EthersTransactionOptions): EthersTransactionResult;
export declare function isTypedDataSigner(signer: any): signer is AbstractSigner;
/**
 * Check if the signerOrProvider is compatible with `Signer`
 * @param signerOrProvider - Signer or provider
 * @returns true if the parameter is compatible with `Signer`
 */
export declare function isSignerCompatible(signerOrProvider: AbstractSigner | Provider): boolean;
