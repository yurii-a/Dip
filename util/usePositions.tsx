import {Transaction} from '@solana/web3.js';
import {
  CrossClient,
  Exchange,
  Network,
  Wallet as ZetaWallet,
  constants,
  types,
  utils,
} from '@zetamarkets/sdk';
import {useCallback, useMemo} from 'react';
import {useAuthorization} from '../components/providers/AuthorizationProvider';
import {useConnection} from '../components/providers//ConnectionProvider';
import {
  Web3MobileWallet,
  transact,
} from '@solana-mobile/mobile-wallet-adapter-protocol-web3js';
import useAssets from '../store';

export default function usePositions() {
  const {connection} = useConnection();
  const {authorizeSession} = useAuthorization();
  const {activeAccount} = useAssets();

  const zetaWallet = useMemo(() => {
    return {
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
  }, [authorizeSession, activeAccount]);
  const fetchAccount = useCallback(async () => {
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
  }, [connection, zetaWallet]);

  return fetchAccount();
}
