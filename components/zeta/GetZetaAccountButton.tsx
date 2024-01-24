import {Transaction} from '@solana/web3.js';
import {
  CrossClient,
  Exchange,
  Network,
  Wallet as ZetaWallet,
  constants,
  types,
  utils,
} from '@zetamarkets/sdk-local';
import React, {useCallback, useMemo, useState} from 'react';
import {Button} from 'react-native';
import {alertAndLog} from '../../util/alertAndLog';
import {
  useAuthorization,
  APP_IDENTITY,
} from '../providers/AuthorizationProvider';
import {useConnection, RPC_ENDPOINT} from '../providers/ConnectionProvider';
import {
  Web3MobileWallet,
  transact,
} from '@solana-mobile/mobile-wallet-adapter-protocol-web3js';

export default function GetZetaAccountButton({onComplete}) {
  const {connection} = useConnection();
  const {selectedAccount, authorizeSession} = useAuthorization();
  const [signingInProgress, setSigningInProgress] = useState(false);

  const storedAuthToken = null; // dummy placeholder function
  const zetaWallet = useMemo(() => {
    return {
      signTransaction: async (transaction: Transaction) => {
        return transact(async (wallet: Web3MobileWallet) => {
          const authorizationResult = await (storedAuthToken
            ? wallet.reauthorize({
                auth_token: storedAuthToken,
                identity: APP_IDENTITY,
              })
            : wallet.authorize({
                cluster: RPC_ENDPOINT,
                identity: APP_IDENTITY,
              }));

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
        return selectedAccount!.publicKey;
      },
    } as ZetaWallet;
  }, [authorizeSession, selectedAccount]);

  const fetchAccount = useCallback(async () => {
    console.log('ZetaWallet Key: ');
    console.log(zetaWallet.publicKey);

    const loadExchangeConfig = types.defaultLoadExchangeConfig(
      Network.MAINNET,
      connection,
      utils.defaultCommitment(),
      0,
      true,
    );

    await Exchange.load(loadExchangeConfig, zetaWallet);

    const client = await CrossClient.load(connection, zetaWallet, undefined);

    let tradingAsset = constants.Asset.SOL;

    // Calculate user account state.
    // let accountState = client.getAccountState();

    // View our position
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
          const accountState = await fetchAccount();
          onComplete(accountState.initialMarginTotal);
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
