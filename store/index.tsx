import {create} from 'zustand';
import {
  PublicKey,
  Connection,
  type ConnectionConfig,
  Transaction,
  VersionedTransaction,
  Keypair,
} from '@solana/web3.js';
import {toUint8Array} from 'js-base64';
import {IAccount, ICoin, IResultItem, IWalletData} from './interfaces';
import {
  transact,
  Web3MobileWallet,
} from '@solana-mobile/mobile-wallet-adapter-protocol-web3js';
// import {
//   CrossClient,
//   Exchange,
//   Network,
//   Wallet,
//   constants,
//   types,
//   utils,
// } from '@zetamarkets/sdk';
// import {
//   AuthorizationResult,
//   AuthorizeAPI,
//   ReauthorizeAPI,
// } from '@solana-mobile/mobile-wallet-adapter-protocol';
export const APP_IDENTITY = {
  name: 'Dip',
  uri: 'https://getdip.app/',
  icon: 'favicon.ico',
};
export const RPC_ENDPOINT = 'https://rpc-proxy.solami.workers.dev/';

interface Position {}

interface IStore {
  wallet: IWalletData | null;
  activeAccount: IAccount | null;
  openPositions: Position[];
  solana: ICoin;
  assets: ICoin[];
  positions: any[];
  error: null | any;
  setActiveAccount: (account: IAccount) => void;
  getAssets: () => void;
  getPositions: () => void;
  connectWallet: () => void;
  fetchOpenPositions: () => void;
}

const useAssets = create<IStore>(set => ({
  wallet: null,
  activeAccount: null,
  openPositions: [],
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
  error: null,
  setActiveAccount: (account: IAccount) => {
    set(state => ({...state, activeAccount: account}));
  },
  getAssets: async () => {
    const url =
      'https://mainnet.helius-rpc.com/?api-key=fa9b9644-4d07-4b1e-98ed-ab113cfcdd25';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: '',
        method: 'getAssetsByOwner',
        params: {
          ownerAddress: '4KsrMapArhJR83ssme2GFQuinpUduqFaY87Z6Lni1eJX',
          displayOptions: {
            showFungible: true,
            showNativeBalance: true,
          },
        },
      }),
    });
    const data = await response.json();
    const formattedResults = data.result.items.map((item: IResultItem) => {
      return {
        id: item.id,
        title: item.token_info.symbol,
        image: item.content.links.image,
        owner: item.ownership.owner,
        tokenAddress: item.token_info.associated_token_address,
        balance: item.token_info.balance / 10 ** item.token_info.decimals,
        price: item.token_info.price_info.price_per_token,
        totalPrice: item.token_info.price_info.total_price,
      };
    });
    const solBalance = {
      id: 'WENWENvqqNya429ubCdR81ZmD69brwQaaBYY6p3LCpk',
      title: 'SOL',
      image: 'SOL',
      owner: '4KsrMapArhJR83ssme2GFQuinpUduqFaY87Z6Lni1eJX',
      tokenAddress: '4KsrMapArhJR83ssme2GFQuinpUduqFaY87Z6Lni1eJX',
      balance: data.result.nativeBalance.lamports / 1e9,
      price: data.result.nativeBalance.price_per_sol,
      totalPrice: data.result.nativeBalance.total_price,
    };
    set(state => ({...state, solana: solBalance}));
    set(state => ({...state, assets: formattedResults}));
  },
  getPositions: async () => {
    // const state = useAssets.getState();

    // const walletKeypair = Keypair.generate();
    // const handleAuthorizationResult = async (
    //   authorizationResult: AuthorizationResult,
    // ): Promise<Authorization> => {
    //   const nextAuthorization = getAuthorizationFromAuthorizationResult(
    //     authorizationResult,
    //     authorization?.selectedAccount,
    //   );
    //   await setAuthorization(nextAuthorization);
    //   return nextAuthorization;
    // };

    // const authorizeSession = async (wallet: AuthorizeAPI & ReauthorizeAPI) => {
    //   const authorizationResult = await wallet.authorize({
    //     identity: APP_IDENTITY,
    //   });
    //   return (await handleAuthorizationResult(authorizationResult))
    //     .selectedAccount;
    // };

    // const wallet = {
    //   publicKey: walletKeypair.publicKey,
    //   signTransaction: async (transaction: Transaction) => {
    //     transact(async (wallet: Web3MobileWallet) => {
    //       const signedTransactions = await wallet.signTransactions({
    //         transactions: [transaction],
    //       });
    //       return signedTransactions[0];
    //     });
    //   },
    //   signAllTransactions: async (transactions: Transaction[]) => {
    //     return transact(async (wallet: Web3MobileWallet) => {
    //       await authorizeSession(wallet);
    //       const signedTransactions = await wallet.signTransactions({
    //         transactions: transactions,
    //       });
    //       return signedTransactions;
    //     });
    //   },
    // };
    // const connection = new Connection(RPC_ENDPOINT, {commitment: 'confirmed'});

    // const loadExchangeConfig = types.defaultLoadExchangeConfig(
    //   Network.MAINNET,
    //   connection,
    //   utils.defaultCommitment(),
    //   0,
    //   true,
    // );

    // const client = await CrossClient.load(connection, wallet);
    // // const asset = constants.Asset.SOL;
    // let tradingAsset = constants.Asset.SOL;

    // // const results = await Exchange.load(loadExchangeConfig, wallet);
    // console.log(client, client.getPositions(tradingAsset));
  },
  connectWallet: async () => {
    const result = await transact(async (wallet: Web3MobileWallet) => {
      const authorizationResult = await wallet.authorize({
        identity: APP_IDENTITY,
      });
      return authorizationResult;
    });

    const wallet = {
      ...result,
      accounts: result.accounts.map(item => {
        const publicKey = new PublicKey(toUint8Array(item.address));
        return {
          ...item,
          label: item.label ?? 'Default label',
          publicKey,
        };
      }),
    };
    set(state => ({...state, wallet: wallet}));
  },
  fetchOpenPositions: async () => {
    // const state = useAssets.getState();
    // const connection = new Connection(RPC_ENDPOINT, {commitment: 'confirmed'});
    // const loadExchangeConfig = types.defaultLoadExchangeConfig(
    //   Network.MAINNET,
    //   connection,
    //   utils.defaultCommitment(),
    //   0,
    //   true,
    // );
    // console.log(loadExchangeConfig, 'configs xxx');
    // if (!state.wallet) {
    //   console.log("Кошелек не инициализирован");
    //   return;
    // }
    // // Пример получения данных о позициях
    // // Этот код нужно адаптировать под актуальные методы и интерфейсы SDK
    // const positions = []; // Заполните данными, используя SDK
    // set({openPositions: positions});
  },
}));

export default useAssets;
