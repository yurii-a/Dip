export interface ApiResponse {
  total: number;
  limit: number;
  cursor?: string;
  items: Token[];
}

export interface Token {
  interface: string;
  id: string;
  content: any;
  authorities: Authority[];
  compression: Compression;
  grouping: Grouping[]; // or any[]
  royalty: Royalty;
  creators: Creator[]; // or any[]
  ownership: Ownership;
  supply: Supply | null | number;
  mutable: boolean;
  burnt: boolean;
  token_info: TokenInfo;
  mint_extensions: MintExtensions;
  inscription: Inscription;
  spl20?: Spl20;
}

export interface Content {
  $schema: string;
  json_uri: string;
  files: any[];
  //   metadata: Record;
  //   links: Record;
}

export interface Authority {
  address: string;
  scopes: string[];
}

export interface Compression {
  eligible: boolean;
  compressed: boolean;
  data_hash: string;
  creator_hash: string;
  asset_hash: string;
  tree: string;
  seq: number;
  leaf_id: number;
}

export interface Grouping {
  group_key: string;
  group_value: string;
  collection_metadata: CollectionMetadata;
}

export interface Royalty {
  royalty_model: string;
  target: string | null;
  percent: number;
  basis_points: number;
  primary_sale_happened: boolean;
  locked: boolean;
}

export interface Creator {
  address: string;
  share: number;
  verified: boolean;
}

export interface Ownership {
  frozen: boolean;
  delegated: boolean;
  delegate: null | string;
  ownership_model: string;
  owner: string;
}

export interface Supply {
  print_max_supply: number;
  print_current_supply: number;
  edition_nonce: number;
}

export interface TokenInfo {
  symbol: string;
  balance: number;
  supply: number;
  decimals: number;
  token_program: string;
  associated_token_address: string;
  price_info: PriceInfo;
}

export interface Inscription {
  order: number;
  size: number;
  contentType: string;
  encoding: string;
  validationHash: string;
  inscriptionDataAccount: string;
}

export interface Spl20 {
  p: string;
  op: string;
  tick: string;
  amt: string;
}

export interface File {
  uri: string;
  cdn_uri: string;
  mime: string;
}

export interface Metadata {
  attributes: Attribute[];
  description: string;
  name: string;
  symbol: string;
}

export interface Attribute {
  value: string;
  trait_type: string;
}

export interface CollectionMetadata {
  name: string;
  symbol: string;
  image: string;
  description: string;
  external_url: string;
}

export interface PriceInfo {
  price_per_token: number;
  total_price: number;
  currency: string;
}

export interface MintExtensions {}
