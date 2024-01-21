/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState, useCallback} from 'react';
import {Button} from 'react-native';
// import {fromUint8Array} from 'js-base64';
import {
  transact,
  Web3MobileWallet,
} from '@solana-mobile/mobile-wallet-adapter-protocol-web3js';
import {
  PublicKey,
  Connection,
  Keypair,
  SystemProgram,
  Transaction,
  VersionedTransaction,
} from '@solana/web3.js';
import {
  CrossClient,
  Exchange,
  Network,
  Wallet,
  utils,
  types,
  assets,
  Decimal,
  constants,
} from '@zetamarkets/sdk';

import {
  AuthorizationProviderContext,
  useAuthorization,
} from './providers/AuthorizationProvider';
import {useConnection} from './providers/ConnectionProvider';
import {alertAndLog} from '../util/alertAndLog';
import {MobileWallet} from '@solana-mobile/mobile-wallet-adapter-protocol';
// import {API_URL, API_TOKEN} from "@env";

// export class ZetaMobileWallet extends ZetaWallet {
//   wallet: MobileWallet;
//   constructor(wallet: MobileWallet) {
//     super(new Keypair());
//     this.wallet = wallet;
//   }

//   async signTransaction(
//     _tx: Transaction | VersionedTransaction,
//   ): Promise<Transaction | VersionedTransaction> {
//     // this.wallet.authorize();
//     throw Error('Not supported by dummy wallet!');
//   }

//   async signAllTransactions(
//     _txs: Transaction[] | VersionedTransaction[],
//   ): Promise<Transaction[] | VersionedTransaction[]> {
//     throw Error('Not supported by dummy wallet!');
//   }

//   get publicKey(): PublicKey {
//     throw Error('Not supported by dummy wallet!');
//   }
// }

export default function GetZetaAccountButton() {
  const {connection} = useConnection();
  const {selectedAccount, authorizeSession} = useAuthorization();
  const [signingInProgress, setSigningInProgress] = useState(false);

  const fetchAccount = useCallback(async () => {
    // Generate a new keypair for wallet otherwise load from a private key.
    const private_key = new Uint8Array([85, 104, 126]);
    const userKey = Keypair.fromSecretKey(private_key);
    const wallet = new Wallet(userKey);

    // Create a solana web3 connection to devnet.
    // const connection: Connection = new Connection(NETWORK_URL, "confirmed");

    const loadExchangeConfig = types.defaultLoadExchangeConfig(
      Network.MAINNET,
      connection,
      utils.defaultCommitment(),
      0,
      true,
    );

    await Exchange.load(loadExchangeConfig, wallet);

    const client = await CrossClient.load(connection, wallet, undefined);

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
  }, [connection]);

  return (
    <Button
      title="Fetch Zeta Account"
      disabled={signingInProgress}
      onPress={async () => {
        if (signingInProgress) {
          return;
        }
        setSigningInProgress(true);
        try {
          const account = await fetchAccount();
          // console.log(fromUint8Array(signedTransaction.serialize()));
        } catch (err: any) {
          alertAndLog(
            'Error during signing',
            err instanceof Error ? err.message : err,
          );
        } finally {
          setSigningInProgress(false);
        }
      }}
    />
  );
}
