import React, {useEffect} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Colors from '../../styles/Colours';
import useAssets from '../../store';

const PositionsSection = () => {
  const {
    positions,
    activeAccount,
    isZetaConnected,
    setIsZetaConnected,
    connectZetaMarkets,
    getPositions,
  } = useAssets();

  useEffect(() => {
    if (isZetaConnected === '' && activeAccount) {
      console.log('work inside');
      setIsZetaConnected('pending');
      connectZetaMarkets(activeAccount);
    } else if (isZetaConnected === 'success') {
      getPositions();
    }
  }, [
    positions,
    isZetaConnected,
    activeAccount,
    setIsZetaConnected,
    connectZetaMarkets,
    getPositions,
  ]);
  function reconnect() {
    if (activeAccount) {
      setIsZetaConnected('pending');
      connectZetaMarkets(activeAccount);
    }
  }

  return (
    <View style={styles.assetsSection}>
      <TouchableOpacity style={styles.title}>
        <Text style={styles.titleText}>OPEN POSITIONS</Text>
        <Icon name="chevron-right" size={20} color={Colors.titleText} />
      </TouchableOpacity>
      <View style={styles.block}>
        {isZetaConnected === 'pending' && (
          <Text style={styles.connectStatus}>Connectiong zeta markets</Text>
        )}
        {isZetaConnected === 'failure' && (
          <TouchableOpacity
            style={styles.connectStatusContainer}
            onPress={reconnect}>
            <Text style={styles.connectStatusFailed}>Connect is failed</Text>
            <Text style={styles.connectStatusClick}>Click to reconnect</Text>
          </TouchableOpacity>
        )}
        {positions.map(item => (
          <TouchableOpacity key={item.asset} style={styles.blockItem}>
            {/* <Image
              resizeMode="contain"
              source={{uri: item.img}}
              style={styles.image}
            /> */}
            <View>
              <Text style={styles.name}>{item.asset} </Text>
              <Text style={styles.label}>
                {item.costOfTrades} cost of trades
              </Text>
            </View>
            <View style={styles.open}>
              <Text style={styles.total}>+${item.size} size</Text>
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
  connectStatusClick: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  connectStatusContainer: {
    padding: 20,
  },
  connectStatusFailed: {
    color: '#ff483b',
    fontSize: 20,
    marginBottom: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  connectStatus: {
    padding: 20,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
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
