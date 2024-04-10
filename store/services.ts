import {Connection, PublicKey, Transaction} from '@solana/web3.js';
import {toUint8Array} from 'js-base64';
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
import {IAccount, IResultItem} from './interfaces';

export const APP_IDENTITY = {
  name: 'Dip',
  uri: 'https://getdip.app/',
  icon: 'favicon.ico',
};
export const RPC_ENDPOINT = 'https://rpc-proxy.solami.workers.dev/';

//________________________________FUNCTIONS________________________________________________________________
export async function getWallet() {
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
  return wallet;
}

export async function getAssets() {
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
  return {assets: formattedResults, solana: solBalance};
}

export async function getPositions(
  activeAccount: IAccount | null,
  authorizeSession: (arg0: Web3MobileWallet) => any,
) {
  const connection = new Connection(RPC_ENDPOINT, {commitment: 'confirmed'});
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

  const loadExchangeConfig = types.defaultLoadExchangeConfig(
    Network.MAINNET,
    connection,
    utils.defaultCommitment(),
    10,
    true,
  );

  await Exchange.load(loadExchangeConfig, zetaWallet);
  const client = await CrossClient.load(connection, zetaWallet);

  await client.updateState();
  const positions = client.getPositions(constants.Asset.SOL);
  return positions;
}
