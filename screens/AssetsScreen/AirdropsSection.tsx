import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Colors from '../../styles/Colours';
import useAssets from '../../store';

const AirdropsSection = () => {
  const {solana, assets} = useAssets();
  const newData = [solana, ...assets];
  return (
    <View style={styles.assetsSection}>
      <TouchableOpacity style={styles.title}>
        <Text style={styles.titleText}>AIRDROPS</Text>
        <Icon name="chevron-right" size={20} color={Colors.titleText} />
      </TouchableOpacity>
      <View style={styles.block}>
        {newData.length > 0 && (
          <FlatList
            data={newData}
            renderItem={({item}) => (
              <TouchableOpacity key={item?.title} style={styles.blockItem}>
                <Image
                  resizeMode="contain"
                  source={require(`./../../assets/img/etherium.png`)}
                  style={styles.image}
                />
                <Text style={styles.label}>{item?.title}</Text>
                <View style={styles.prices}>
                  <Text style={styles.total}>
                    {item?.balance ? item?.balance.toFixed(2) + ' coins' : ''}
                  </Text>
                  <View style={styles.percents}>
                    <Text style={{color: 'white', textAlign: 'center'}}>
                      $ {item?.totalPrice.toFixed(2)}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
        {newData.map(item => (
          <TouchableOpacity key={item?.title} style={styles.blockItem}>
            <Image
              resizeMode="contain"
              source={require(`./../../assets/img/etherium.png`)}
              style={styles.image}
            />
            <Text style={styles.label}>{item?.title}</Text>
            <View style={styles.prices}>
              <Text style={styles.total}>
                {item?.balance ? item?.balance.toFixed(2) + ' coins' : ''}
              </Text>
              <View style={styles.percents}>
                <Text style={{color: 'white', textAlign: 'center'}}>
                  $ {item?.totalPrice.toFixed(2)}
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
