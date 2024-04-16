import React from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Colors from '../../styles/Colours';
import useAssets from '../../store';

const TotalSection = () => {
  const {assets, solana} = useAssets();
  // function HandlePress(title: string) {
  //   return navigation.navigate(title.toLowerCase());
  // }
  return (
    <View style={styles.assetsSection}>
      <TouchableOpacity style={styles.title}>
        <Text style={styles.titleText}>ASSETS</Text>
        <Icon name="chevron-right" size={20} color={Colors.titleText} />
      </TouchableOpacity>
      <View style={styles.block}>
        {[solana, ...assets].map(item => (
          <TouchableOpacity
            key={item?.title}
            style={styles.blockItem}
            // onPress={() => HandlePress(item.title)}
          >
            <Image source={{uri: item.image}} style={styles.image} />
            <Text style={styles.label}>{item.title}</Text>
            <View style={styles.prices}>
              <Text style={styles.quantity}>{item.balance.toFixed(3)}</Text>
              <Text style={styles.total}>${item.totalPrice.toFixed(2)}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default TotalSection;

const styles = StyleSheet.create({
  quantity: {
    fontSize: 18,
    color: 'white',
    marginRight: 10,
    fontWeight: 'bold',
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 40,
    marginRight: 11,
  },
  assetsSection: {
    marginBottom: 28,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  titleText: {
    fontFamily: 'Bebas Neue',
    color: Colors.titleText,
    opacity: 0.8,
    fontSize: 20,
  },
  block: {
    backgroundColor: 'rgba(255, 255, 255, .2)',
    borderRadius: 16,
  },
  blockItem: {
    flexDirection: 'row',
    padding: 8,
    alignItems: 'center',
  },
  label: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  prices: {
    marginLeft: 'auto',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 4,
  },
  total: {
    color: 'white',
    fontSize: 16,
    fontWeight: '400',
    marginRight: 6,
    marginBottom: 2,
  },
  percents: {
    backgroundColor: Colors.green,
    color: 'white',
    marginRight: 4,
    borderRadius: 100,
    textAlign: 'center',
    padding: 2,
    paddingLeft: 8,
    paddingRight: 8,
    fontSize: 14,
  },
});
