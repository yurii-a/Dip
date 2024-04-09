import {Transaction} from '@solana/web3.js';
import {
  CrossClient,
  Exchange,
  Wallet as ZetaWallet,
  constants,
} from '@zetamarkets/sdk';
import React, {useCallback, useMemo} from 'react';
import {Button} from 'react-native';
import {alertAndLog} from '../../util/alertAndLog';
import {useAuthorization} from '../providers/AuthorizationProvider';
import {useConnection} from '../providers/ConnectionProvider';
import {
  Web3MobileWallet,
  transact,
} from '@solana-mobile/mobile-wallet-adapter-protocol-web3js';
import {CrossMarginAccountState} from '@zetamarkets/sdk/dist/types';
import useAssets from '../../store';

export default function GetZetaAccountButton() {
  const {connection} = useConnection();
  const {authorizeSession} = useAuthorization();
  const {activeAccount} = useAssets()

  // const storedAuthToken = null; // dummy placeholder function
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

    console.log('work');
    const client = await CrossClient.load(connection, zetaWallet);
    console.log('work2');

    let tradingAsset = constants.Asset.SOL;

    console.log('Positions: ');
    console.log(client.getPositions(tradingAsset));

    let marginAccountState = Exchange.riskCalculator.getCrossMarginAccountState(
      client.account!,
    );
    alertAndLog('Cross Margin account state', marginAccountState.toString());
    return marginAccountState;
  }, [connection, zetaWallet]);

  return (
    <Button
      title="Fetch"
      onPress={async () => {
        try {
          const accountState: CrossMarginAccountState = await fetchAccount();
          console.log(accountState);
        } catch (err: any) {
          alertAndLog(
            'Error during signing',
            err instanceof Error ? err.message : err,
          );
        }
      }}
    />
  );
}
