import {create} from 'zustand';
import {IAccount, ICoin, IWalletData} from './interfaces';
import {types} from '@zetamarkets/sdk';

import {getAssets, getPositions, getWallet} from './services';

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
  connectWallet: () => void;
  setActiveAccount: (account: IAccount) => void;
  setPositions: (positions: types.Position[]) => void;
  getAssets: () => void;
  getPositions: (callback: any) => void;
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
  connectWallet: async () => {
    const wallet = await getWallet();
    set(state => ({...state, wallet: wallet}));
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
  getPositions: async (callback: any) => {
    const activeAccaunt = await get().activeAccount;
    const positions = await getPositions(activeAccaunt, callback);
    set(state => ({...state, positions: positions}));
  },
}));

export default useAssets;
