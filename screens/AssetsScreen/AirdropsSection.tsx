import React, {useEffect} from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Colors from '../../styles/Colours';
import useAssets from '../../store';
import formatCurrency from '../../util/CurrencyUtils';

const AirdropsSection = () => {
  const {airdrops, getAirdrops} = useAssets();
  useEffect(() => {
    getAirdrops();
  }, [getAirdrops]);

  return (
    <View style={styles.assetsSection}>
      <TouchableOpacity style={styles.title}>
        <Text style={styles.titleText}>AIRDROPS</Text>
        <Icon name="chevron-right" size={20} color={Colors.titleText} />
      </TouchableOpacity>
      <View style={styles.block}>
        {airdrops.map(item => (
          <TouchableOpacity key={item.name} style={styles.blockItem}>
            <Image
              resizeMode="contain"
              source={item.logo}
              style={styles.image}
            />
            <View>
              <Text style={styles.label}>{item.name}</Text>
              <Text style={styles.amount}>
                {Number(item.tokens).toFixed(0) + ' ' + item.ticker}
              </Text>
            </View>
            <View style={styles.prices}>
              <Text style={styles.total}>
                {item?.getValue() != null
                  ? formatCurrency(item.getValue()!)
                  : ''}
              </Text>
              <Text style={styles.status}>Claim</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default AirdropsSection;

const styles = StyleSheet.create({
  status: {
    padding: 4,
    paddingLeft: 10,
    paddingRight: 10,
    color: Colors.white,
    backgroundColor: Colors.purpleDark,
    borderRadius: 10,
    fontFamily: 'Asap',
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
  image: {
    width: 40,
    height: 40,
    marginRight: 11,
    borderRadius: 100,
    backgroundColor: Colors.grey,
    overflow: 'hidden',
  },
  label: {
    color: Colors.white,
    fontFamily: 'Asap',
    fontSize: 16,
    fontWeight: '600',
  },
  amount: {
    color: Colors.white,
    fontFamily: 'Asap',
    fontSize: 14,
    fontWeight: '500',
    opacity: 0.8,
  },
  prices: {
    marginLeft: 'auto',
    alignItems: 'center',
    flexDirection: 'row',
  },
  total: {
    color: Colors.white,
    fontFamily: 'Asap',
    fontSize: 18,
    fontWeight: '400',
    marginRight: 16,
  },
});
