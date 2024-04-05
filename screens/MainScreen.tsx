import React, {useCallback, useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

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
    },
    [connection],
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
      <Header />
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
              <Text style={styles.successTitle}>
                Success!!! Wallet connected!!
              </Text>
              {/* <Text>Walet address: {selectedAccount.address}</Text> */}
              <Text style={styles.mainBalance}>{balance?.toFixed(2)} SOL</Text>
            </View>
            <Button
              title="ASSETS"
              onPress={() => navigation.navigate('assets')}
            />
          </>
        ) : (
          <View style={{marginTop: 'auto'}}>
            <ConnectButton title="Connect wallet" />
          </View>
        )}
        <Text>Selected cluster: {connection.rpcEndpoint}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mainBalance: {
    color: 'blue',
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
