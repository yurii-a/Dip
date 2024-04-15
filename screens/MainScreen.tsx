import React, {useEffect} from 'react';
import {
  Button,
  // FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
} from 'react-native';
import Colors from '../styles/Colours';
import useAssets from '../store';
import {getAllocationsAirdrop, getPointsAirdrop} from '../store/services';
export default function MainScreen({navigation}: {navigation: any}) {
  const {activeAccount, connectWallet, setIsZetaConnected, getSolanaBalance} =
    useAssets();

  useEffect(() => {
    if (activeAccount) {
      setIsZetaConnected('pending');
      getSolanaBalance();
      getAllocationsAirdrop(String(activeAccount.publicKey));
      getPointsAirdrop(String(activeAccount.publicKey));
      navigation.navigate('assets');
    }
  }, [activeAccount, getSolanaBalance, navigation, setIsZetaConnected]);

  return (
    <>
      <View style={styles.mainContainer}>
        <View style={styles.logo}>
          <Text style={styles.title}>Get started with DIP</Text>
          <Image
            resizeMode={'contain'}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              width: '80%',
              height: 300,
              alignSelf: 'center',
              marginBottom: 100,
            }}
            source={require('../assets/img/intro_bg.png')}
          />
        </View>
        <View>
          <Text style={styles.inputLabel}>Enter your wallet address</Text>
          <TextInput style={styles.input} />
          <Text style={styles.inputLabel}>or</Text>
          <Button title="Connect wallet" onPress={connectWallet} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  logo: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 40,
    fontWeight: '700',
    textAlign: 'center',
  },
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
    backgroundColor: Colors.purple,
    justifyContent: 'space-between',
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
