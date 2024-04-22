import React, {useEffect} from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Colors from '../../styles/Colours';
import useAssets from '../../store';
import formatCurrency from '../../util/CurrencyUtils';

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
  function getImage(name: string) {
    return name === 'SOL'
      ? require('../../assets/img/sol.png')
      : name === 'JUP'
      ? require('../../assets/img/jup.png')
      : require('../../assets/img/eth.png');
  }

  return (
    <View style={styles.assetsSection}>
      <TouchableOpacity style={styles.title}>
        <Text style={styles.titleText}>OPEN POSITIONS</Text>
        <Icon name="chevron-right" size={20} color={Colors.titleText} />
      </TouchableOpacity>
      <View style={styles.block}>
        {isZetaConnected === 'pending' && (
          <Text style={styles.connectStatus}>Connecting to markets</Text>
        )}
        {isZetaConnected === 'failure' && (
          <TouchableOpacity
            style={styles.connectStatusContainer}
            onPress={reconnect}>
            <Text style={styles.connectStatusFailed}>
              Failed to fetch open positions
            </Text>
            <Text style={styles.connectStatusClick}>Try again</Text>
          </TouchableOpacity>
        )}
        {positions.map(item => (
          <TouchableOpacity key={item.asset} style={styles.blockItem}>
            <Image
              resizeMode="contain"
              source={getImage(item.asset.toUpperCase())}
              style={styles.image}
            />
            <View>
              <Text style={styles.name}>
                {item.size > 0 ? 'Long ' : 'Short '}
                {Math.abs(item.size).toFixed(2)} {item.asset}
              </Text>
              <Text style={styles.label}>
                {/* {'Entry price: '} */}
                {formatCurrency(item.entryPrice, true)} {'→'}
                {formatCurrency(item.markPrice, true)}
              </Text>
            </View>
            <View style={styles.open}>
              <Text style={styles.total}>{formatCurrency(item.pnl, true)}</Text>
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
    color: Colors.white,
    fontSize: 14,
    textAlign: 'center',
  },
  connectStatusContainer: {
    padding: 12,
  },
  connectStatusFailed: {
    color: Colors.black,
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
  },
  connectStatus: {
    padding: 14,
    color: Colors.white,
    fontSize: 14,
    textAlign: 'left',
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
    backgroundColor: Colors.grey,
    borderRadius: 20,
    overflow: 'visible',
  },
  name: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: 'Asap',
  },
  label: {
    color: Colors.white,
    fontSize: 12,
    fontFamily: 'Asap',
    fontWeight: '500',
  },
  open: {
    marginLeft: 'auto',
    alignItems: 'center',
    flexDirection: 'row',
  },
  total: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '400',
    marginRight: 6,
    marginBottom: 2,
  },
  percents: {
    backgroundColor: Colors.green,
    color: Colors.white,
    marginRight: 4,
    borderRadius: 100,
    textAlign: 'center',
    padding: 2,
    paddingLeft: 8,
    paddingRight: 8,
    fontSize: 14,
  },
});
