import React, {useCallback, useEffect, useState} from 'react';
import {Button, Image, StyleSheet, Text, TextInput, View} from 'react-native';

// import {Section} from '../components/Section';
// import AccountInfo from '../components/AccountInfo';
// import ZetaSection from '../components/zeta/ZetaSection';
import ConnectButton from '../components/ConnectButton';
import {
  useAuthorization,
  Account,
} from '../components/providers/AuthorizationProvider';
import {useConnection} from '../components/providers/ConnectionProvider';
import {Header} from '../components/Header';
import Colors from '../styles/Colours';
import DisconnectButton from '../components/DisconnectButton';
interface IProps {
  navigation: any;
}
export default function MainScreen({navigation}: IProps) {
  const {connection} = useConnection();
  const {selectedAccount} = useAuthorization();
  const [balance, setBalance] = useState<number | null>(null);

  const fetchAndUpdateBalance = useCallback(
    async (account: Account) => {
      const fetchedBalance = await connection.getBalance(account.publicKey);
      setBalance(fetchedBalance / 1e9);
      navigation.navigate('assets');
    },
    [connection, navigation],
  );

  useEffect(() => {
    if (!selectedAccount) {
      return;
    }
    fetchAndUpdateBalance(selectedAccount);
  }, [fetchAndUpdateBalance, selectedAccount]);
  console.log(selectedAccount, 'xxx');
  return (
    <>
      {/* <Header /> */}
      <View style={styles.mainContainer}>
        {selectedAccount ? (
          <>
            {/* <ScrollView contentContainerStyle={styles.scrollContainer}>
              <>
              <Section title="Get Zeta Account">
              <ZetaSection />
              </Section>
              </>
              </ScrollView>
              <AccountInfo
              selectedAccount={selectedAccount}
              balance={balance}
              fetchAndUpdateBalance={fetchAndUpdateBalance}
            /> */}
            <View style={styles.success}>
              <Text>Walet Connected! Address: {selectedAccount.address}</Text>
              <Text style={styles.mainBalance}>{balance?.toFixed(2)} SOL</Text>
            </View>
            <Button
              title="ASSETS"
              onPress={() => navigation.navigate('assets')}
            />
            <DisconnectButton title="Disconnect" />
          </>
        ) : (
          <View style={{marginTop: 'auto'}}>
            <Text style={styles.title}>Get started with DIP</Text>
            <Image
              resizeMode={'contain'}
              style={{width: '80%', height: 300, alignSelf: 'center', marginBottom: 100}}
              source={require('../assets/img/intro_bg.png')}
            />
            <Text style={styles.inputLabel}>Enter your wallet address</Text>
            <TextInput style={styles.input} />
            <Text style={styles.inputLabel}>or</Text>
            <ConnectButton title="Connect wallet" />
          </View>
        )}
        {/* <Text>Selected cluster: {connection.rpcEndpoint}</Text> */}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    color: '#fff',
    fontSize: 40,
    fontWeight: '700',
    textAlign: 'center',
  },
  mainBalance: {
    color: Colors.purpleDark,
    fontSize: 24,
    fontWeight: 'bold',
  },
  success: {
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
    backgroundColor: Colors.purple,
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
  inputLabel: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#ffffff',
    color: Colors.purpleDark,
    opacity: 0.3,
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
});
