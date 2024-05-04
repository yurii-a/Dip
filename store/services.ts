/* eslint-disable prettier/prettier */
import {LAMPORTS_PER_SOL, PublicKey, Transaction} from '@solana/web3.js';
import {toUint8Array} from 'js-base64';
import axios from 'axios';
import {
  CrossClient,
  Exchange,
  Network,
  Wallet as ZetaWallet,
  constants,
  types,
  utils,
} from '@zetamarkets/sdk';
import {
  transact,
  Web3MobileWallet,
} from '@solana-mobile/mobile-wallet-adapter-protocol-web3js';
import {Dex, IAccount, IAsset, HeliusAsset, OpenPosition} from './interfaces';
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
        label: item.label ?? 'My wallet',
        publicKey,
      };
    }),
  };
  return wallet;
}

export async function getSolanaWalletBalance(account: IAccount) {
  const publicKey = new PublicKey(toUint8Array(account.address));
  const fetchedBalance = await connection.getBalance(publicKey);
  return fetchedBalance / LAMPORTS_PER_SOL;
}

export async function getZetaWallet(account: IAccount) {
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
      return account.publicKey;
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
    10,
    false,
  );
  try {
    await Exchange.load(loadExchangeConfig, zetaWallet);
    return 'success';
  } catch (error) {
    return 'failure';
  }
}

const mapZetaPosition = (position: types.Position, accountState: types.CrossMarginAccountState, markPrice: number): OpenPosition => {
  const { asset, size, costOfTrades } = position;
  const exchange = Dex.ZETA;
  const entryPrice = Math.abs(costOfTrades / size);
  const pnl = accountState.assetState.get(asset)!.unrealizedPnl;

  return { asset, exchange, entryPrice, markPrice, size, pnl };
};

export async function getPositions(account: IAccount) {
  const zetaWallet = await getZetaWallet(account);
  const client = await CrossClient.load(connection, zetaWallet);
  await client.updateState();
  const assets = Object.values(constants.Asset);

  const positionPromises = assets.map(async assetValue => {
    const positions = client.getPositions(assetValue);
    return positions;
  });
  const res = await Promise.all(positionPromises);

  const accountState = client.getAccountState();
  const positions = res
    .filter(item => item !== undefined && item.length > 0)
    .flat();

  const markPositions = Promise.all(positions.map(async (item) => {
    const markPrice = Exchange.getMarkPrice(item.asset);
    const position = mapZetaPosition(item, accountState, markPrice);
    return position;
  }));

  return markPositions;
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
