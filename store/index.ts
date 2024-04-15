import {create} from 'zustand';
import {IAccount, IAsset, IWalletData} from './interfaces';
import {types} from '@zetamarkets/sdk';

import {
  connectZetaMarkets,
  getAssets,
  getPositions,
  getSolanaBalance,
  getWallet,
} from './services';
import {Connection} from '@solana/web3.js';

export const APP_IDENTITY = {
  name: 'Dip',
  uri: 'https://getdip.app/',
  icon: 'favicon.ico',
};
export const RPC_ENDPOINT = 'https://rpc-proxy.solami.workers.dev/';

interface IStore {
  wallet: IWalletData | null;
  activeAccount: IAccount | null;
  totalBalance: number;
  solana: IAsset;
  solanaBalance: number;
  assets: IAsset[];
  positions: types.Position[];
  airdrops: any[];
  connection: Connection;
  isZetaConnected: '' | 'pending' | 'success' | 'failure';
  connectWallet: () => void;
  setActiveAccount: (account: IAccount) => void;
  setIsZetaConnected: (status: '' | 'pending' | 'success' | 'failure') => void;
  getAssets: () => void;
  connectZetaMarkets: () => void;
  getPositions: () => void;
  getAirdrops: () => void;
  getSolanaBalance: () => void;
}

const useAssets = create<IStore>((set, get) => ({
  wallet: null,
  activeAccount: null,
  totalBalance: 0,
  solana: {
    id: '',
    title: 'SOL',
    image: 'https://logos-world.net/wp-content/uploads/2024/01/Solana-Logo.png',
    owner: '',
    tokenAddress: '',
    balance: 0,
    price: 0,
    totalPrice: 0,
  },
  solanaBalance: 0,
  assets: [],
  positions: [],
  airdrops: [],
  connection: new Connection(RPC_ENDPOINT, {commitment: 'confirmed'}),
  isZetaConnected: '',

  connectWallet: async () => {
    const wallet = await getWallet();
    set(state => ({
      ...state,
      wallet: wallet,
      activeAccount: wallet.accounts[0],
    }));
  },
  setActiveAccount: account => {
    set(state => ({...state, activeAccount: account}));
  },
  setIsZetaConnected: status => {
    set(state => ({...state, isZetaConnected: status}));
  },
  getAssets: async () => {
    const {assets, solana} = await getAssets();
    const totalAssets =
      solana.totalPrice + assets.reduce((a, i) => a + i.totalPrice, 0);
    set(state => ({
      ...state,
      assets: assets,
      solana: solana,
      totalBalance: totalAssets,
    }));
  },
  getAirdrops: async () => {},
  getSolanaBalance: async () => {
    const account = get().activeAccount;
    const balance = await getSolanaBalance(account);
    set(state => ({...state, solanaBalance: balance}));
  },
  connectZetaMarkets: async () => {
    const res = await connectZetaMarkets();
    set(state => ({...state, isZetaConnected: res}));
  },

  getPositions: async () => {
    const account = get().activeAccount;
    const positions = await getPositions(account);
    set(state => ({...state, positions: positions}));
  },
}));

export default useAssets;