import React, {useState, useCallback} from 'react';
import {Button} from 'react-native';
// import {fromUint8Array} from 'js-base64';
import {
  transact,
  Web3MobileWallet,
} from '@solana-mobile/mobile-wallet-adapter-protocol-web3js';
import { PublicKey, Connection, Keypair, SystemProgram, Transaction} from '@solana/web3.js';
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

import {useAuthorization} from './providers/AuthorizationProvider';
import {useConnection} from './providers/ConnectionProvider';
import {alertAndLog} from '../util/alertAndLog';
// import {API_URL, API_TOKEN} from "@env";

export default function GetZetaAccountButton() {
  const {connection} = useConnection();
  const {selectedAccount, authorizeSession} = useAuthorization();
  const [signingInProgress, setSigningInProgress] = useState(false);

  // const signTransaction = useCallback(async () => {
  //   return await transact(async (wallet: Web3MobileWallet) => {
  //     // First, request for authorization from the wallet and fetch the latest
  //     // blockhash for building the transaction.
  //     const [authorizationResult, latestBlockhash] = await Promise.all([
  //       authorizeSession(wallet),
  //       connection.getLatestBlockhash(),
  //     ]);

  //     // Construct a transaction. This transaction uses web3.js `SystemProgram`
  //     // to create a transfer that sends lamports to randomly generated address.
  //     const keypair = Keypair.generate();
  //     const randomTransferTransaction = new Transaction({
  //       ...latestBlockhash,
  //       feePayer: authorizationResult.publicKey,
  //     }).add(
  //       SystemProgram.transfer({
  //         fromPubkey: authorizationResult.publicKey,
  //         toPubkey: keypair.publicKey,
  //         lamports: 1_000,
  //       }),
  //     );

  //     // Sign a transaction and receive
  //     const signedTransactions = await wallet.signTransactions({
  //       transactions: [randomTransferTransaction],
  //     });

  //     return signedTransactions[0];
  //   });
  // }, [authorizeSession, connection]);

  const fetchAccount = useCallback(async () => {
    // Generate a new keypair for wallet otherwise load from a private key.
    // const private_key = new Uint8Array([85, 104, 126 ...]);
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
    console.log("Positions: ");
    console.log(client.getPositions(tradingAsset));

    let marginAccountState = Exchange.riskCalculator.getCrossMarginAccountState(
      client.account!,
    );
    console.log("Cross Margin account state: ");
    console.log(marginAccountState);
    return marginAccountState;
  }, [authorizeSession, connection]);


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

// export default function SignTransactionButton() {
//   const {connection} = useConnection();
//   const {authorizeSession} = useAuthorization();
//   const [signingInProgress, setSigningInProgress] = useState(false);

//   const signTransaction = useCallback(async () => {
//     return await transact(async (wallet: Web3MobileWallet) => {
//       // First, request for authorization from the wallet and fetch the latest
//       // blockhash for building the transaction.
//       const [authorizationResult, latestBlockhash] = await Promise.all([
//         authorizeSession(wallet),
//         connection.getLatestBlockhash(),
//       ]);

//       // Construct a transaction. This transaction uses web3.js `SystemProgram`
//       // to create a transfer that sends lamports to randomly generated address.
//       const keypair = Keypair.generate();
//       const randomTransferTransaction = new Transaction({
//         ...latestBlockhash,
//         feePayer: authorizationResult.publicKey,
//       }).add(
//         SystemProgram.transfer({
//           fromPubkey: authorizationResult.publicKey,
//           toPubkey: keypair.publicKey,
//           lamports: 1_000,
//         }),
//       );

//       // Sign a transaction and receive
//       const signedTransactions = await wallet.signTransactions({
//         transactions: [randomTransferTransaction],
//       });

//       return signedTransactions[0];
//     });
//   }, [authorizeSession, connection]);

//   return (
//     <Button
//       title="Sign Transaction"
//       disabled={signingInProgress}
//       onPress={async () => {
//         if (signingInProgress) {
//           return;
//         }
//         setSigningInProgress(true);
//         try {
//           const signedTransaction = await signTransaction();
//           alertAndLog(
//             'Transaction signed',
//             'View SignTransactionButton.tsx for implementation.',
//           );
//           console.log(fromUint8Array(signedTransaction.serialize()));
//         } catch (err: any) {
//           alertAndLog(
//             'Error during signing',
//             err instanceof Error ? err.message : err,
//           );
//         } finally {
//           setSigningInProgress(false);
//         }
//       }}
//     />
//   );
// }