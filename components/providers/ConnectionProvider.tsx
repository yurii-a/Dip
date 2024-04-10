import {Connection, type ConnectionConfig} from '@solana/web3.js';
import React, {
  type FC,
  type ReactNode,
  useMemo,
  createContext,
  useContext,
} from 'react';

export const RPC_ENDPOINT = 'https://rpc-proxy.solami.workers.dev/';
export const RPC_CLUSTER = 'Mainnet';

export interface ConnectionProviderProps {
  children: ReactNode;
  config?: ConnectionConfig;
}

export const ConnectionProvider: FC<ConnectionProviderProps> = ({
  children,
  config = {commitment: 'confirmed'},
}) => {
  const connection = useMemo(
    () => new Connection(RPC_ENDPOINT, config),
    [config],
  );
  return (
    <ConnectionContext.Provider value={{connection}}>
      {children}
    </ConnectionContext.Provider>
  );
};

export interface ConnectionContextState {
  connection: Connection;
}

export const ConnectionContext = createContext<ConnectionContextState>(
  {} as ConnectionContextState,
);

export function useConnection(): ConnectionContextState {
  return useContext(ConnectionContext);
}
