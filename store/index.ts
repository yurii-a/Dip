import {create} from 'zustand';
import {IAccount, IWalletData} from './interfaces';
import { Asset } from '../types/asset';
import { Position } from '../types/position';

import {
  connectZetaMarkets,
  getDriftAirdrop,
  getKaminoAirdrop,
  getParclAirdrop,
  getPositions,
  getWallet,
} from './services';
import {fetchAssets} from './HeliusApi';
import {Connection} from '@solana/web3.js';
import {Airdrop} from '../types/airdrop';

export const APP_IDENTITY = {
  name: 'Dip',
  uri: 'https://getdip.app/',
  icon: 'favicon.ico',
};
export const RPC_ENDPOINT = 'https://rpc-proxy.solami.workers.dev/';

interface IStore {
  wallet: IWalletData | null;
  readOnlyWallets: string[];
  activeAccount: IAccount | null;
  totalBalance: number;
  assets: Asset[];
  positions: Position[];
  airdrops: Airdrop[];
  connection: Connection;
  isZetaConnected: '' | 'pending' | 'success' | 'failure';
  connectWallet: () => void;
  addWallets: (wallets: string[]) => void;
  setActiveAccount: (account: IAccount) => void;
  setIsZetaConnected: (status: '' | 'pending' | 'success' | 'failure') => void;
  getAssets: () => void;
  connectZetaMarkets: (account: IAccount) => void;
  getPositions: () => void;
  getAirdrops: () => void;
}

const useAssets = create<IStore>((set, get) => ({
  wallet: null,
  readOnlyWallets: [],
  activeAccount: null,
  totalBalance: 0,
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
  addWallets: wallets => {
    set(state => ({...state, readOnlyWallets: wallets}));
  },

  setActiveAccount: account => {
    set(state => ({...state, activeAccount: account}));
  },
  setIsZetaConnected: status => {
    set(state => ({...state, isZetaConnected: status}));
  },
  getAssets: async () => {
    const account = get().activeAccount;
    if (account == null) {
      //TODO add logic when account is null, e.g. take to auth screen
      console.error('No active account found. Cant fetch assets');
      return;
    }
    const publicKey = String(account.publicKey);
    const {assets, solana, totalBalance} = await fetchAssets(publicKey);
    set(state => ({
      ...state,
      assets: assets,
      solana: solana,
      totalBalance: totalBalance,
    }));
  },
  getAirdrops: async () => {
    const account = get().activeAccount;
    if (account === null) {
      return;
    }

    const airdrops: Airdrop[] = [];
    const wallet = account.publicKey.toString();

    const parcl = await getParclAirdrop(wallet);
    const kamino_tokens = await getKaminoAirdrop(wallet);
    const drift_total = await getDriftAirdrop(wallet);

    if (parcl.allocation > 0) {
      airdrops.push(Airdrop.createParcl(parcl.allocation));
    }
    if (kamino_tokens > 0) {
      airdrops.push(Airdrop.createKamino(kamino_tokens));
    }
    if (drift_total > 0) {
      airdrops.push(Airdrop.createDrift(drift_total));
    }

    set(state => ({
      ...state,
      airdrops: airdrops,
    }));
  },
  connectZetaMarkets: async account => {
    const res = await connectZetaMarkets(account);
    set(state => ({...state, isZetaConnected: res}));
  },

  getPositions: async () => {
    const account = get().activeAccount;
    if (account == null) {
      return;
    }
    const positions = await getPositions(account);
    set(state => ({...state, positions: positions}));
  },
}));

export default useAssets;
