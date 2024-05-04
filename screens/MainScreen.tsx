import React, {useEffect} from 'react';
import {StyleSheet, Text, TextInput, View, Image} from 'react-native';
import Colors from '../styles/Colours';
import useAssets from '../store';
import Button from 'react-native-ui-lib/src/components/button';
export default function MainScreen({navigation}: {navigation: any}) {
  const {activeAccount, connectWallet, getAirdrops, getAssets} = useAssets();
  useEffect(() => {
    if (activeAccount) {
      // getAssets();
      // getAirdrops();
      navigation.navigate('assets');
    }
  }, [activeAccount, getAirdrops, getAssets, navigation]);
  return (
    <>
      <View style={styles.mainContainer}>
        <View style={styles.logo}>
          <Text style={styles.title}>Get started with DIP</Text>
          <Image
            resizeMode={'contain'}
            style={styles.illustration}
            source={require('../assets/img/intro_bg.png')}
          />
        </View>
        <View>
          <Text style={styles.inputLabel}>Enter your wallet addresses</Text>
          <TextInput multiline style={styles.input} numberOfLines={3}>
            <Text>
              FvgywbgW4L9n6iPqi5cxCBJCu3WJB9MW21znyBnWncMt{'\n'}
              toly.sol
            </Text>
          </TextInput>
          <Button
            label="Add"
            backgroundColor={Colors.purpleDark}
            color={Colors.white}
          />

          <Text style={styles.divider}>– or –</Text>
          <Button
            label="Connect wallet"
            onPress={connectWallet}
            backgroundColor={Colors.purpleDark}
            color={Colors.white}
          />
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
  illustration: {
    width: '80%',
    height: 300,
    alignSelf: 'center',
    marginBottom: 100,
  },
  title: {
    color: Colors.white,
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
    color: Colors.black,
    marginLeft: 12,
  },
  wallets: {
    alignItems: 'center',
  },
  accountsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.black,
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
    color: Colors.white,
    fontFamily: 'Asap',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'left',
  },

  divider: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: 'Asap',
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 12,
  },

  input: {
    backgroundColor: Colors.grey,
    color: Colors.black,
    fontSize: 16,
    fontFamily: 'Asap',
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 12,
    borderRadius: 10,
  },
});
