import React from 'react';
import {Button, View, Text, StyleSheet} from 'react-native';

import {alertAndLog} from '../../util/alertAndLog';

export default function GetZetaAccountButton() {
  const textStyle = {fontWeight: 'bold'}; // Add the missing import for 'fontWeight' type

  return (
    <>
      <Button
        title="Fetch"
        onPress={async () => {
          alertAndLog(
            'Get Account is trigerred',
            'Reaching here means that the button is working',
          );
        }}
      />
      <Text style={styles.titleText}>Your margin account</Text>
      <Text style={styles.baseText}>
        {'Amount: 1000.00 SOL\n'}
        {'Total value: 5000.00 SOL\n'}
        {'Leverage: 7.8x\n'}
        {'P&L: +20.00 SOL\n'}
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