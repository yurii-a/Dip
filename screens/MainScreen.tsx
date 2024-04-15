import React, {useEffect} from 'react';
import {Button, FlatList, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {Header} from '../components/Header';
import Colors from '../styles/Colours';
import useAssets from '../store';
import {TouchableOpacity} from 'react-native-gesture-handler';
export default function MainScreen({navigation}: {navigation: any}) {
  const {
    wallet,
    solanaBalance,
    connection,
    activeAccount,
    connectWallet,
    setActiveAccount,
    setIsZetaConnected,
    connectZetaMarkets,
    getSolanaBalance,
  } = useAssets();

  useEffect(() => {
    if (activeAccount) {
      setIsZetaConnected('pending');
      // connectZetaMarkets();
      getSolanaBalance();
    }
  }, [activeAccount, connectZetaMarkets, getSolanaBalance, setIsZetaConnected]);

  return (
    <>
      <Header />
      <View style={styles.mainContainer}>
        {wallet && !activeAccount && (
          <View style={styles.wallets}>
            <Text style={styles.accountsTitle}>Accounts: </Text>
            {wallet && (
              <FlatList
                data={wallet.accounts}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => {
                      setActiveAccount(item);
                    }}>
                    <View style={styles.address}>
                      <Icon name="link" size={20} />
                      <Text style={styles.addressText}>{item.address}</Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            )}
          </View>
        )}
        {/* {isZetaConnected === 'pending' && ( //When we waiting zeta Markets Connecting
          <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator color={Colors.purple} />
          </View>
        )}
        {isZetaConnected === 'failure' && ( //When zeta markets connecting failed
          <View>
            <Text style={styles.successTitle}> reject </Text>
            <Button
              title="Reconnect"
              onPress={() => {
                setIsZetaConnected('pending');
                connectZetaMarkets();
              }}
            />
          </View>
        )} */}
        {activeAccount && ( //When zeta markets connecting success
          <>
            <View style={styles.success}>
              <Text style={styles.successTitle}>
                Success!!! Wallet connected!!
              </Text>
              <Text style={styles.mainBalance}>
                {solanaBalance?.toFixed(2)} SOL
              </Text>
            </View>
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
