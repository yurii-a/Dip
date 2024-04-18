import React from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Colors from '../../styles/Colours';
import useAssets from '../../store';
const data: {title: string; total: string; percents: string}[] = [
  {
    title: 'NFTS',
    total: '25000',
    percents: '-6.33%',
  },
  {
    title: 'Trading',
    total: '5500',
    percents: '+999%',
  },
  {
    title: 'Lending',
    total: '6500',
    percents: '+0.21%',
  },
];
const TotalSection = () => {
  const {assets, solana} = useAssets();
  // function HandlePress(title: string) {
  //   return navigation.navigate(title.toLowerCase());
  // }
  const totalAssets = assets.reduce((acc, asset) => acc + asset.totalPrice, 0);
  console.log(totalAssets, 'total assets');
  const coins = {
    title: 'Coins',
    total: +totalAssets + solana.totalPrice,
    percents: '+2.02%',
  };
  return (
    <View style={styles.assetsSection}>
      <TouchableOpacity style={styles.title}>
        <Text style={styles.titleText}>TOTAL WEALTH</Text>
        <Icon name="chevron-right" size={20} color={Colors.titleText} />
      </TouchableOpacity>

      <View style={styles.block}>
        {[coins, ...data].map(item => (
          <TouchableOpacity key={item.title} style={styles.blockItem}>
            <View style={styles.icon}>
              <Icon name="upload" size={20} color={Colors.darkGray} />
            </View>
            <Text style={styles.label}>{item.title}</Text>
            <View style={styles.prices}>
              <Text style={styles.total}>
                $ {Number(item.total).toFixed(2)}
              </Text>
              <View style={styles.percents}>
                <Text style={{color: 'white'}}>{item.percents}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.block}>
        {[coins, ...data].map(item => (
          <TouchableOpacity key={item.title} style={styles.blockItem}>
            <View style={styles.icon}>
              <Icon name="upload" size={20} color={Colors.darkGray} />
            </View>
            <Text style={styles.label}>{item.title}</Text>
            <View style={styles.prices}>
              <Text style={styles.total}>
                $ {Number(item.total).toFixed(2)}
              </Text>
              <View style={styles.percents}>
                <Text style={{color: 'white'}}>{item.percents}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.block}>
        {[coins, ...data].map(item => (
          <TouchableOpacity key={item.title} style={styles.blockItem}>
            <View style={styles.icon}>
              <Icon name="upload" size={20} color={Colors.darkGray} />
            </View>
            <Text style={styles.label}>{item.title}</Text>
            <View style={styles.prices}>
              <Text style={styles.total}>
                $ {Number(item.total).toFixed(2)}
              </Text>
              <View style={styles.percents}>
                <Text style={{color: 'white'}}>{item.percents}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.block}>
        {[coins, ...data].map(item => (
          <TouchableOpacity key={item.title} style={styles.blockItem}>
            <View style={styles.icon}>
              <Icon name="upload" size={20} color={Colors.darkGray} />
            </View>
            <Text style={styles.label}>{item.title}</Text>
            <View style={styles.prices}>
              <Text style={styles.total}>
                $ {Number(item.total).toFixed(2)}
              </Text>
              <View style={styles.percents}>
                <Text style={{color: 'white'}}>{item.percents}</Text>
              </View>
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
  icon: {
    width: 40,
    height: 40,
    borderRadius: 100,
    paddingBottom: 2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 11,
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
