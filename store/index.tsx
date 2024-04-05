import {create} from 'zustand';
import {ICoin, IResultItem} from './interfaces';

interface IStore {
  solana: ICoin;
  assets: ICoin[];
  error: null | any;
  getAssets: () => void;
}

const useAssets = create<IStore>(set => ({
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
  error: null,
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
}));

export default useAssets;
