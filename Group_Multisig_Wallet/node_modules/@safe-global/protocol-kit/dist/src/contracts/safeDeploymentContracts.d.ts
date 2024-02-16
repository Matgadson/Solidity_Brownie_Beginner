import { ContractNetworkConfig } from '../types';
import { CompatibilityFallbackHandlerContract, CreateCallContract, EthAdapter, MultiSendCallOnlyContract, MultiSendContract, SafeContract, SafeProxyFactoryContract, SafeVersion, SignMessageLibContract, SimulateTxAccessorContract } from '@safe-global/safe-core-sdk-types';
import { SingletonDeployment } from '@safe-global/safe-deployments';
export interface GetContractInstanceProps {
    ethAdapter: EthAdapter;
    safeVersion: SafeVersion;
    customContracts?: ContractNetworkConfig;
}
export interface GetSafeContractInstanceProps extends GetContractInstanceProps {
    isL1SafeSingleton?: boolean;
    customSafeAddress?: string;
}
export declare function getSafeContractDeployment(safeVersion: SafeVersion, chainId: bigint, isL1SafeSingleton?: boolean): SingletonDeployment | undefined;
export declare function getCompatibilityFallbackHandlerContractDeployment(safeVersion: SafeVersion, chainId: bigint): SingletonDeployment | undefined;
export declare function getMultiSendCallOnlyContractDeployment(safeVersion: SafeVersion, chainId: bigint): SingletonDeployment | undefined;
export declare function getMultiSendContractDeployment(safeVersion: SafeVersion, chainId: bigint): SingletonDeployment | undefined;
export declare function getSafeProxyFactoryContractDeployment(safeVersion: SafeVersion, chainId: bigint): SingletonDeployment | undefined;
export declare function getSignMessageLibContractDeployment(safeVersion: SafeVersion, chainId: bigint): SingletonDeployment | undefined;
export declare function getCreateCallContractDeployment(safeVersion: SafeVersion, chainId: bigint): SingletonDeployment | undefined;
export declare function getSimulateTxAccessorContractDeployment(safeVersion: SafeVersion, chainId: bigint): SingletonDeployment | undefined;
export declare function getSafeContract({ ethAdapter, safeVersion, customSafeAddress, isL1SafeSingleton, customContracts }: GetSafeContractInstanceProps): Promise<SafeContract>;
export declare function getProxyFactoryContract({ ethAdapter, safeVersion, customContracts }: GetContractInstanceProps): Promise<SafeProxyFactoryContract>;
export declare function getCompatibilityFallbackHandlerContract({ ethAdapter, safeVersion, customContracts }: GetContractInstanceProps): Promise<CompatibilityFallbackHandlerContract>;
export declare function getMultiSendContract({ ethAdapter, safeVersion, customContracts }: GetContractInstanceProps): Promise<MultiSendContract>;
export declare function getMultiSendCallOnlyContract({ ethAdapter, safeVersion, customContracts }: GetContractInstanceProps): Promise<MultiSendCallOnlyContract>;
export declare function getSignMessageLibContract({ ethAdapter, safeVersion, customContracts }: GetContractInstanceProps): Promise<SignMessageLibContract>;
export declare function getCreateCallContract({ ethAdapter, safeVersion, customContracts }: GetContractInstanceProps): Promise<CreateCallContract>;
export declare function getSimulateTxAccessorContract({ ethAdapter, safeVersion, customContracts }: GetContractInstanceProps): Promise<SimulateTxAccessorContract>;
