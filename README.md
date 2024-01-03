# Solami - Mobile Portfolio Manager for Solana

Solami is the Porfolio Manager for Solana built with love for mobile users.
While the most dApp are built for web, the mobile experience is cumbersome.

Solami is the game changer for Web3 and the beginning of an epic journey toward Mobile 3.

# What Solami can do
- Track your assets spread across those great Solana protocols
- Check health of your borrowings on Marginfi or Kamino and quickly avoid liquidations
- Stake to the validators who is about to airdrop
- Long or Short assets via trading protocols straight from the app

Stay tuned for updates!

This React Native dApp is only fully functional on Android.

## Featured Libarires
- [Mobile Wallet Adapter](https://github.com/solana-mobile/mobile-wallet-adapter/tree/main/js/packages/mobile-wallet-adapter-protocol) for connecting to wallets and signing transactions/messages
- [web3.js](https://solana-labs.github.io/solana-web3.js/) for constructing transactions and an RPC `connection` client.
- https://wix.github.io/react-native-ui-lib/docs/getting-started/setup
- 

<table>
  <tr>
    <td align="center">
      <img src="https://github.com/solana-mobile/solana-mobile-dapp-scaffold/assets/18451967/3d83d3dc-ab65-4a2c-881d-8a229f34e392" alt="Scaffold dApp Screenshot 1" width=300 />
    </td>
    <td align="center">
      <img src="https://github.com/solana-mobile/solana-mobile-dapp-scaffold/assets/18451967/2fd69bd4-834d-45e1-8c7a-f80b5b576c96" alt="Scaffold dApp Screenshot 3" width=300 />
    </td>
    <td align="center">
      <img src="https://github.com/solana-mobile/solana-mobile-dapp-scaffold/assets/18451967/cdd93c12-d9ff-4739-81af-92da5b90303a" alt="Scaffold dApp Screenshot 2" width=300 />
    </td>
  </tr>
</table>

## Prerequisites

If you haven't setup a React Native development environment for Android, you'll need to do that first. Follow the [Prerequisite Setup Guide](https://docs.solanamobile.com/getting-started/development-setup).

Follow the guide to make sure you:
- setup your Android and React Native development environment.
- have an Android device or emulator.
- install an MWA compliant wallet app on your device/emulator.
   
## Usage
1. Initialize project template
```
npx react-native init MySolanaDapp --template https://github.com/solana-mobile/solana-mobile-dapp-scaffold.git
```
2. Install dependencies
- `yarn install` or `npm install`
3. Launch the app on your Android device/emulator
- `npx react-native run-android`

## Troubleshooting
  
- `TypeError: cli.init is not a function`: This during template initialization means you have an old version of React Native CLI.
This template only works with the new CLI. You can uninstall and reinstall it as directed [here](https://stackoverflow.com/questions/72768245/typeerror-cli-init-is-not-a-function-for-react-native).

- `Looks like your iOS environment is not properly set`: You can ignore this during template initialization and build the Android app as normal. This template is only compatible with Android.



