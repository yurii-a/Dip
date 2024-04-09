import React, {useCallback, useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {useConnection} from '../components/providers/ConnectionProvider';
import {Header} from '../components/Header';
import Colors from '../styles/Colours';
import useAssets from '../store';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {IAccount} from '../store/interfaces';
import {PublicKey} from '@solana/web3.js';
import {toUint8Array} from 'js-base64';
import GetZetaAccountButton from '../components/zeta/GetZetaAccountButton';
interface IProps {
  navigation: any;
}
export default function MainScreen({navigation}: IProps) {
  const {connection} = useConnection();
  const [balance, setBalance] = useState<number | null>(null);
  const {connectWallet, wallet, activeAccount, setActiveAccount} = useAssets();

  const fetchAndUpdateBalance = useCallback(
    async (account: IAccount) => {
      const publicKey = new PublicKey(toUint8Array(account.address));
      const fetchedBalance = await connection.getBalance(publicKey);
      setBalance(fetchedBalance / 1e9);
    },
    [connection],
  );
  useEffect(() => {
    if (!activeAccount) {
      return;
    }
    fetchAndUpdateBalance(activeAccount);
  }, [fetchAndUpdateBalance, activeAccount]);
  return (
    <>
      <Header />
      <View style={styles.mainContainer}>
        {wallet && !activeAccount && (
          <View style={styles.wallets}>
            <Text style={styles.accountsTitle}>Accounts: </Text>

            {wallet &&
              wallet.accounts.map(item => (
                <TouchableOpacity
                  key={item.label}
                  onPress={() => {
                    setActiveAccount(item);
                  }}>
                  <View style={styles.address}>
                    <Icon name="link" size={20} />
                    <Text style={styles.addressText}>{item.address}</Text>
                  </View>
                </TouchableOpacity>
              ))}
          </View>
        )}
        {activeAccount && (
          <>
            <View style={styles.success}>
              <Text style={styles.successTitle}>
                Success!!! Wallet connected!!
              </Text>
              <Text style={styles.mainBalance}>{balance?.toFixed(2)} SOL</Text>
            </View>
            <GetZetaAccountButton />
            <Button
              title="ASSETS"
              onPress={() => navigation.navigate('assets')}
            />
          </>
        )}

        {!wallet && (
          <View style={{marginTop: 'auto'}}>
            <Button title="Connect wallet" onPress={connectWallet} />
          </View>
        )}
        <Text>Selected cluster: {connection.rpcEndpoint}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  address: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.purple,
    borderRadius: 10,
    padding: 24,
    paddingLeft: 12,
    paddingRight: 12,
  },
  addressText: {
    color: 'black',
    marginLeft: 12,
  },
  wallets: {
    alignItems: 'center',
  },
  accountsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 12,
  },
  mainBalance: {
    color: 'blue',
    fontSize: 24,
    fontWeight: 'bold',
  },
  success: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    paddingBottom: 50,
    alignItems: 'center',
  },
  successTitle: {
    fontSize: 24,
    color: Colors.purple,
    marginBottom: 20,
  },
  mainContainer: {
    height: '100%',
    padding: 16,
    flex: 1,
  },
  scrollContainer: {
    height: '100%',
  },
  buttonGroup: {
    flexDirection: 'column',
    paddingVertical: 4,
  },
});
