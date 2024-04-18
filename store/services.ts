/* eslint-disable prettier/prettier */
import {PublicKey, Transaction} from '@solana/web3.js';
import {toUint8Array} from 'js-base64';
import axios from 'axios';
import {
  CrossClient,
  Exchange,
  Network,
  Wallet as ZetaWallet,
  constants,
  // events,
  types,
  // assets,
  utils,
} from '@zetamarkets/sdk';
import {
  transact,
  Web3MobileWallet,
} from '@solana-mobile/mobile-wallet-adapter-protocol-web3js';
import {IAccount, IAsset, IResultItem} from './interfaces';
import {useAuthorizationStore} from './useAuthorizationStore';
import useAssets from './index';
export const APP_IDENTITY = {
  name: 'Dip',
  uri: 'https://getdip.app/',
  icon: 'favicon.ico',
};
export const RPC_ENDPOINT = 'https://rpc-proxy.solami.workers.dev/';
const {authorizeSession} = useAuthorizationStore.getState();
const {connection, activeAccount} = useAssets.getState();
//________________________________FUNCTIONS________________________________________________________________
export async function getWallet() { //Here we can connect solana wallets that we have at our phone
  const result = await transact(async (wallet: Web3MobileWallet) => { //function of connectin wallet
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
  return wallet;
}

export async function GetSolanaBalance(account: IAccount) {
  const publicKey = new PublicKey(toUint8Array(account.address));
  const fetchedBalance = await connection.getBalance(publicKey);
  return fetchedBalance / 1e9;
}
export async function getAssets(address: string): Promise<{assets: IAsset[]; solana: IAsset}> {//get balances from helius api using our solana wallet address

  const url =
    'https://mainnet.helius-rpc.com/?api-key=fa9b9644-4d07-4b1e-98ed-ab113cfcdd25';
  const requestData = {
    jsonrpc: '2.0',
    id: '',
    method: 'getAssetsByOwner',
    params: {
      ownerAddress: address,
      displayOptions: {
        showFungible: true,
        showNativeBalance: true,
      },
    },
  };
  const response = await axios.post(url, requestData);
  const formattedResults = response.data.result.items.map((item: IResultItem) => {
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
    id: '1',
    title: 'SOL',
    image: 'https://logos-world.net/wp-content/uploads/2024/01/Solana-Logo.png',
    owner: activeAccount?.address || '',
    tokenAddress: activeAccount?.address || '',
    balance: response.data.result.nativeBalance.lamports / 1e9,
    price: response.data.result.nativeBalance.price_per_sol,
    totalPrice: response.data.result.nativeBalance.total_price,
  };
  return {assets: formattedResults, solana: solBalance};
}

export async function getZetaWallet(activeAccount: IAccount | null) {
  const zetaWallet = {
    signTransaction: async (transaction: Transaction) => {
      return transact(async (wallet: Web3MobileWallet) => {
        const signedTransactions = await wallet.signTransactions({
          transactions: [transaction],
        });
        return signedTransactions[0];
      });
    },
    signAllTransactions: async (transactions: Transaction[]) => {
      return transact(async (wallet: Web3MobileWallet) => {
        await authorizeSession(wallet);
        const signedTransactions = await wallet.signTransactions({
          transactions: transactions,
        });
        return signedTransactions;
      });
    },
    get publicKey() {
      return activeAccount!.publicKey;
    },
  } as ZetaWallet;
  return zetaWallet;
}

export async function connectZetaMarkets(account: IAccount) {
  const zetaWallet = await getZetaWallet(account);
  const loadExchangeConfig = types.defaultLoadExchangeConfig(
    Network.MAINNET,
    connection,
    utils.defaultCommitment(),
    100,
    false,
  );
  try {
    await Exchange.load(loadExchangeConfig, zetaWallet);
    return 'success';
  } catch (error) {
    return 'failure';
  }
}
export async function getPositions(activeAccount: IAccount | null) {
  const zetaWallet = await getZetaWallet(activeAccount);
  const client = await CrossClient.load(connection, zetaWallet);
  await client.updateState();
  const assetValues = Object.values(constants.Asset);

  const positionPromises = assetValues.map(async assetValue => {
    const positions = await client.getPositions(assetValue);
    return positions;
  });

  const res = await Promise.all(positionPromises);
  const positions = res
    .filter(item => item !== undefined && item.length > 0)
    .flat();

  return positions;
}
export async function getSolanaBalance(
  account: IAccount | null,
): Promise<number> {
  if (!account) {return 0;}
  const publicKey = new PublicKey(toUint8Array(account.address));
  const fetchedBalance = await connection.getBalance(publicKey);
  return fetchedBalance / 1e9;
}

export async function getKaminoAirdrop(wallet: string) {
  const url = `https://api.hubbleprotocol.io/v2/airdrop/users/${wallet}/allocations?source=Season1`;
  try {
    const response = await axios.get(url);
    const total = response.data.reduce((total, item) => {
      const quantity = parseFloat(item.quantity);
      if (!isNaN(quantity)) {
          return total + quantity;
      } else {
          return total;
      }
    }, 0);
    return total;
  } catch (error) {
    console.error('Error fetching airdrop allocations:', error);
    throw error;
  }
}

export async function getParclAirdrop(wallet: string) {
  const url = `https://app.parcl.co/api/allocation/${wallet}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching user points balance:', error);
    throw error;
  }
}

export async function getDriftAirdrop(wallet: string) {
  const url = `https://app.drift.trade/api/points-drop?authority=${wallet}&bust`;
  try {
    const response = await axios.get(url);
    return response.data.data.latestDrop.authorityScore;
  } catch (error) {
    console.error('Error fetching user points balance:', error);
    throw error;
  }
}