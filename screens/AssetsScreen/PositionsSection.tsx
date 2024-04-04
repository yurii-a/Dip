import React from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Colors from '../../styles/Colours';

interface IAsset {
  img: any;
  title: string;
  margin: string;
  positionType: string;
  balance: string;
  position: string;
}

const data: IAsset[] = [
  {
    img: require(`./../../assets/img/sol.png`),
    title: 'SOL',
    margin: '100',
    positionType: 'LONG',
    balance: '5234',
    position: '5000',
  },
  {
    img: require(`./../../assets/img/drift.png`),
    title: 'NYC Real Estate',
    margin: '8',
    positionType: 'LONG',
    balance: '300',
    position: '10',
  },
  {
    img: require(`./../../assets/img/etherium.png`),
    title: 'ETH',
    margin: '5',
    positionType: 'SHORT',
    balance: '200',
    position: '530',
  },
];

const PositionsSection = () => {
  return (
    <View style={styles.assetsSection}>
      <TouchableOpacity style={styles.title}>
        <Text style={styles.titleText}>OPEN POSITIONS</Text>
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
            <View>
              <Text style={styles.name}>
                {item.margin}X {item.positionType}
              </Text>
              <Text style={styles.label}>
                {item.position} {item.title}
              </Text>
            </View>
            <View style={styles.open}>
              <Text style={styles.total}>+${item.balance}</Text>
              <Icon name="chevron-right" size={20} color={Colors.titleText} />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default PositionsSection;

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
  name: {
    color: 'white',
    fontSize: 10,
  },
  label: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  open: {
    marginLeft: 'auto',
    alignItems: 'center',
    flexDirection: 'row',
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
