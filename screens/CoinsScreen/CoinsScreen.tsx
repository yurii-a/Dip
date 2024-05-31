import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import Colors from '../../styles/Colors';

import useAssets from '../../store';
import {FlatList} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Entypo';

const AssetsScreen = () => {
  const {assets} = useAssets();

  useEffect(() => {}, []);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Text>Main</Text>
      <FlatList
        data={assets}
        renderItem={({item}) => (
          <View>
            <View style={styles.label}>
              <Icon name="link" size={20} />
              <Text style={styles.title}>{item.title}</Text>
            </View>
            <View style={styles.prices}>
              <Text style={styles.percents}>{item.title}</Text>
              <Text style={styles.balance}>{item.title}</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default AssetsScreen;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.purple,
    height: '100%',
  },
  mainContent: {
    paddingTop: 18,
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 18,
  },
  label: {},
  title: {},
  prices: {},
  balance: {},
  percents: {},
});
