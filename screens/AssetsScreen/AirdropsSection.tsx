import React from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Colors from '../../styles/Colours';

interface IAsset {
  img: any;
  title: string;
  pts: string;
  status: string;
}

const data: IAsset[] = [
  {
    img: require(`./../../assets/img/marginFi.png`),
    title: 'MarginFi',
    pts: '850',
    status: 'Claim',
  },
  {
    img: require(`./../../assets/img/parcl.png`),
    title: 'Parcl',
    pts: '100',
    status: 'Start now',
  },
  {
    img: require(`./../../assets/img/drift.png`),
    title: 'Drift',
    pts: '',
    status: 'Start now',
  },
  {
    img: require(`./../../assets/img/wormhole.png`),
    title: 'Wormhole',
    pts: '',
    status: 'Upcoming',
  },
  {
    img: require(`./../../assets/img/etherium.png`),
    title: 'Jupiter',
    pts: '',
    status: 'Claimed',
  },
];

const AirdropsSection = () => {
  return (
    <View style={styles.assetsSection}>
      <TouchableOpacity style={styles.title}>
        <Text style={styles.titleText}>AIRDROPS</Text>
        <Icon name="chevron-right" size={20} color={Colors.titleText} />
      </TouchableOpacity>
      <View style={styles.block}>
        {data.map(item => (
          <TouchableOpacity key={item.title} style={styles.blockItem}>
            <Image
              resizeMode="contain"
              source={item.img}
              style={styles.image}
            />
            <Text style={styles.label}>{item.title}</Text>
            <View style={styles.prices}>
              <Text style={styles.total}>
                {item.pts ? item.pts + 'K pts' : ''}
              </Text>
              <View style={styles.percents}>
                <Text style={{color: 'white', textAlign: 'center'}}>
                  {item.status}
                </Text>
              </View>
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
