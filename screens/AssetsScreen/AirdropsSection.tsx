import React, {useEffect} from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Colors from '../../styles/Colours';
import useAssets from '../../store';

const AirdropsSection = () => {
  const {kamino, parcl, getAirdrops} = useAssets();
  useEffect(() => {
    getAirdrops();
  }, [getAirdrops]);
  const newData = [
    {
      name: 'parcl',
      quantity: parcl.balance,
    },
    ...kamino,
  ];
  return (
    <View style={styles.assetsSection}>
      <TouchableOpacity style={styles.title}>
        <Text style={styles.titleText}>AIRDROPS</Text>
        <Icon name="chevron-right" size={20} color={Colors.titleText} />
      </TouchableOpacity>
      <View style={styles.block}>
        {newData.map(item => (
          <TouchableOpacity key={item.name} style={styles.blockItem}>
            <Image
              resizeMode="contain"
              source={require(`./../../assets/img/etherium.png`)}
              style={styles.image}
            />
            <Text style={styles.label}>{item.name}</Text>
            <View style={styles.prices}>
              <Text style={styles.total}>
                Balance: {Number(item.quantity).toFixed(2)}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default AirdropsSection;

const styles = StyleSheet.create({
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
    overflow: 'visible',
  },
  label: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  prices: {
    marginLeft: 'auto',
    alignItems: 'center',
    flexDirection: 'row',
  },
  total: {
    color: 'white',
    fontSize: 18,
    fontWeight: '400',
    marginRight: 16,
  },
  percents: {
    backgroundColor: Colors.purpleDark,
    color: 'white',
    marginRight: 4,
    borderRadius: 100,
    textAlign: 'center',
    justifyContent: 'center',
    padding: 2,
    paddingLeft: 8,
    paddingRight: 8,
    fontSize: 14,
    width: 80,
  },
});
