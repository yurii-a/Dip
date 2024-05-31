import React from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../styles/Colors';
import useAssets from '../../store';
import formatCurrency from '../../util/CurrencyUtils';
import typography from '../../styles/Typography';

const data: {
  icon: NodeRequire;
  title: string;
  total: number;
  dailyChange: string;
}[] = [
  {
    icon: require('../../assets/img/ic_nft.png'),
    title: 'NFTs',
    total: 25000,
    dailyChange: '-6.33%',
  },
  {
    icon: require('../../assets/img/ic_trading.png'),
    title: 'Trading',
    total: 5500,
    dailyChange: '+999%',
  },
  {
    icon: require('../../assets/img/ic_lending.png'),
    title: 'Lending',
    total: 6500,
    dailyChange: '+0.21%',
  },
];
const TotalSection = () => {
  const {totalBalance} = useAssets();
  // function HandlePress(title: string) {
  //   return navigation.navigate(title.toLowerCase());
  // }
  console.log(totalBalance, 'total assets');
  const coins = {
    icon: require('../../assets/img/ic_coins.png'),
    title: 'Coins',
    total: totalBalance,
    dailyChange: '+2.02%',
  };
  return (
    <View style={styles.assetsSection}>
      <TouchableOpacity style={styles.title}>
        <Text style={typography.title}>TOTAL WEALTH</Text>
        <Icon name="chevron-right" size={20} color={Colors.lightGrey} />
      </TouchableOpacity>

      <View style={styles.block}>
        {[coins, ...data].map(item => (
          <TouchableOpacity key={item.title} style={styles.blockItem}>
            <Image
              resizeMode="contain"
              source={item.icon}
              style={styles.image}
            />
            <Text style={[typography.label, {color: Colors.white}]}>
              {item.title}
            </Text>
            <View style={styles.prices}>
              <Text style={styles.total}>
                {formatCurrency(item.total, true)}
              </Text>
              <View style={styles.dailyChange}>
                <Text style={{color: 'white'}}>{item.dailyChange}</Text>
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
    color: Colors.white,
    marginRight: 10,
    fontWeight: 'bold',
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 100,
    paddingBottom: 2,
    backgroundColor: Colors.grey,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 11,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 40,
    marginRight: 11,
    backgroundColor: Colors.grey,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  assetsSection: {
    marginTop: 28,
    marginBottom: 28,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
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
    fontFamily: 'Asap',
    color: Colors.white,
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
    color: Colors.white,
    fontSize: 16,
    fontWeight: '400',
    marginRight: 6,
    marginBottom: 2,
  },
  dailyChange: {
    backgroundColor: Colors.green,
    marginRight: 4,
    borderRadius: 100,
    textAlign: 'center',
    padding: 2,
    paddingLeft: 8,
    paddingRight: 8,
    fontSize: 14,
  },
});
