import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {View, Text, Button} from 'react-native-ui-lib';

const offers = [
  {
    title: 'Diversify staking',
    description: 'Split staking into multiple bags to catch upcoming airdrops',
    action_label: 'Optimise',
  },
  {
    title: 'Loop borrowing',
    description: 'Lend SOL and borrow mSOL on Kamino to lend on MarginFi',
    action_label: 'Loop',
  },
  {
    title: 'Qualify for Wormhole airdrop',
    description: 'Send USDC to Arbitrum and back to generate volume on Wormhole',
    action_label: 'Loop',
  },
];

const ActionSection = () => {
  return (
    <FlatList
      data={offers}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => (
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.description}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button label={item.action_label} onPress={() => {
              
            }} />
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  textContainer: {
    flex: 2,
  },
  title: {
    fontWeight: 'bold',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default ActionSection;
