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
  files: any[]; // This will depend on the structure of files array
  json_uri: string;
  links: any; // This will depend on the structure of links object
  metadata: any; // This will depend on the structure of metadata object
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
  target: any; // This will depend on the structure of target object
}

interface TokenInfo {
  associated_token_address: string;
  balance: number;
  decimals: number;
  price_info: any; // This will depend on the structure of price_info object
  supply: number;
  symbol: string;
  token_program: string;
}

export interface IResultItem {
  authorities: any[]; // This will depend on the structure of authorities array
  burnt: boolean;
  compression: Compression;
  content: Content;
  creators: any[]; // This will depend on the structure of creators array
  grouping: any[]; // This will depend on the structure of grouping array
  id: string;
  interface: string;
  mutable: boolean;
  ownership: Ownership;
  royalty: Royalty;
  supply: any; // This will depend on the actual data type
  token_info: TokenInfo;
}

export interface ICoin {
  id: string;
  title: string;
  image: string;
  owner: string;
  tokenAddress: string;
  balance: number;
  price: number;
  totalPrice: number;
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
