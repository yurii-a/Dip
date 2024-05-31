import {AuthToken} from '@solana-mobile/mobile-wallet-adapter-protocol';
import {PublicKey} from '@solana/web3.js';

export interface IAccount {
  address: string;
  label: string | undefined;
  publicKey: PublicKey;
  isReadOnly: boolean;
}

export interface IWalletData {
  accounts: IAccount[];
  auth_token: string;
  wallet_uri_base: string;
}

export type Authorization = {
  accounts: IAccount[];
  authToken: AuthToken;
  activeAccount: IAccount | null;
};
