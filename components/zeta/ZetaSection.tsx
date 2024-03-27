import React, {useState} from 'react';
import {Button, View, Text, StyleSheet} from 'react-native';

import GetZetaAccountButton from './GetZetaAccountButton';
import {CrossMarginAccountState} from '@zetamarkets/sdk/dist/types';

export default function ZetaSection() {
  const [account, setAccount] = useState<CrossMarginAccountState>();

  return (
    <>
      <GetZetaAccountButton
        onComplete={(marginAccount: CrossMarginAccountState) => {
          setAccount(marginAccount);
          // if (account) {
          //   alertAndLog('Account fetched:', marginAccount.toString());
          // }
        }}
      />
      <Text style={styles.titleText}>Your margin account</Text>
      <Text style={styles.baseText}>
        {`Balance: ${account?.balance.toFixed(2) || ''}\n`}
        {`PnL: ${account?.unrealizedPnlTotal.toFixed(2) || ''}\n`}
        {`Equity: ${account?.equity.toFixed(2) || ''}\n`}
      </Text>
      <Text style={styles.titleText}>Open positions</Text>
      <View>
        <Text style={styles.baseText}>{'SOL: 1000.00 SOL\n'}</Text>
        <Button title="Close" onPress={() => {}} />
      </View>
      <View>
        <Text style={styles.baseText}>{'BTC: 123.00 BTC\n'}</Text>
        <Button title="Close" onPress={() => {}} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Cochin',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
