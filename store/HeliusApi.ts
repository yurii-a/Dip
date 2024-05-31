import axios from 'axios';
import { Asset } from '../types/asset';
import {RPC_ENDPOINT} from './services';
import {LAMPORTS_PER_SOL} from '@solana/web3.js';
import {Token} from '../types/helius_token';

function mapSolanaBalance(nativeBalance: any, address: string): Asset {
  return {
    id: '1',
    title: 'SOL',
    image: 'https://logos-world.net/wp-content/uploads/2024/01/Solana-Logo.png',
    owner: address,
    tokenAddress: address,
    balance: nativeBalance.lamports / LAMPORTS_PER_SOL,
    price: nativeBalance.price_per_sol,
    totalPrice: nativeBalance.total_price,
  };
}

function createPostBody(address: string) {
  return {
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
}

function mapResponse(item: Token) {
  const token_info = item.token_info;
  if (token_info == null) {
    return null;
  }
  return {
    id: item.id,
    title: token_info?.symbol,
    image: item.content.links.image,
    owner: item.ownership.owner,
    tokenAddress: token_info.associated_token_address,
    balance: token_info.balance / 10 ** token_info.decimals,
    price: token_info.price_info?.price_per_token,
    totalPrice: token_info.price_info?.total_price,
  };
}

export async function fetchAssets(
  address: string,
): Promise<{assets: Asset[]; solana: Asset; totalBalance: number}> {
  console.log('Asset fetch started');
  const body = createPostBody(address);
  const response = await axios.post(RPC_ENDPOINT, body);
  const assets = response.data.result.items
    .filter((item: Token) => item.interface === 'FungibleToken')
    .map(mapResponse);

  const nativeBalance = response.data.result.nativeBalance;
  const solBalance = mapSolanaBalance(nativeBalance, address);

  const totalBalance = assets.reduce((accumulator: number, item: Asset) => {
    return accumulator + item.totalPrice;
  }, 0);

  return {
    assets: assets,
    solana: solBalance,
    totalBalance: totalBalance + solBalance.totalPrice,
  };
}
