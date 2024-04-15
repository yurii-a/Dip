import {AuthToken} from '@solana-mobile/mobile-wallet-adapter-protocol';
import {PublicKey} from '@solana/web3.js';

interface Compression {
  asset_hash: string;
  compressed: boolean;
  creator_hash: string;
  data_hash: string;
  eligible: boolean;
  leaf_id: number;
  seq: number;
  tree: string;
}

interface Content {
  $schema: string;
  files: any[];
  json_uri: string;
  links: any;
  metadata: any;
}

interface Ownership {
  delegate: any; // This will depend on the structure of delegate object
  delegated: boolean;
  frozen: boolean;
  owner: string;
  ownership_model: string;
}

interface Royalty {
  basis_points: number;
  locked: boolean;
  percent: number;
  primary_sale_happened: boolean;
  royalty_model: string;
  target: any;
}

interface TokenInfo {
  associated_token_address: string;
  balance: number;
  decimals: number;
  price_info: any;
  supply: number;
  symbol: string;
  token_program: string;
}

export interface IResultItem {
  authorities: any[];
  burnt: boolean;
  compression: Compression;
  content: Content;
  creators: any[];
  grouping: any[];
  id: string;
  interface: string;
  mutable: boolean;
  ownership: Ownership;
  royalty: Royalty;
  supply: any; // This will depend on the actual data type
  token_info: TokenInfo;
}
export interface IAccount {
  address: string;
  label: string | undefined;
  publicKey: PublicKey;
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
export interface IAsset {
  id: string;
  title: string;
  image: string;
  owner: string;
  tokenAddress: string;
  balance: number;
  price: number;
  totalPrice: number;
}
