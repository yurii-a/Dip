import {create} from 'zustand';
import {IAccount, ICoin, IWalletData} from './interfaces';
import {types} from '@zetamarkets/sdk';

import {
  connectZetaMarkets,
  getAssets,
  getPositions,
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
  solana: ICoin;
  assets: ICoin[];
  positions: types.Position[];
  connection: Connection;
  isZetaConnected: boolean;
  connectWallet: () => void;
  setActiveAccount: (account: IAccount) => void;
  setPositions: (positions: types.Position[]) => void;
  getAssets: () => void;
  connectZetaMarkets: () => void;
  getPositions: () => void;
}

const useAssets = create<IStore>((set, get) => ({
  wallet: null,
  activeAccount: null,
  solana: {
    id: '',
    title: 'SOL',
    image: 'SOL',
    owner: '',
    tokenAddress: '',
    balance: 0,
    price: 0,
    totalPrice: 0,
  },
  assets: [],
  positions: [],
  connection: new Connection(RPC_ENDPOINT, {commitment: 'confirmed'}),
  isZetaConnected: false,
  connectWallet: async () => {
    const wallet = await getWallet();
    set(state => ({
      ...state,
      wallet: wallet,
      activeAccount: wallet.accounts[0],
    }));
    const res = await connectZetaMarkets(wallet.accounts[0]);
    set(state => ({...state, isZetaConnected: res}));
  },
  setActiveAccount: (account: IAccount) => {
    set(state => ({...state, activeAccount: account}));
  },
  getAssets: async () => {
    const {assets, solana} = await getAssets();
    set(state => ({...state, solana: solana}));
    set(state => ({...state, assets: assets}));
  },
  setPositions: positions => {
    set(state => ({...state, positions: positions}));
  },
  connectZetaMarkets: async () => {
    const account = get().activeAccount;
    const res = await connectZetaMarkets(account);
    set(state => ({...state, isZetaConnected: res}));
  },
  getPositions: async () => {
    const account = get().activeAccount;
    const positions = await getPositions(account);
    set(state => ({...state, positions: positions}));
  },
}));

export default useAssets;
