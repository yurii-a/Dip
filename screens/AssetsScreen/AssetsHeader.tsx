import React from 'react';
import {TouchableOpacity, StyleSheet, Text, View, Animated} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../styles/Colours';
import useAssets from '../../store';
import {useNavigation} from '@react-navigation/native';
import {alignType, flexType} from './AssetsScreen';
import formatCurrency from '../../util/CurrencyUtils';
interface HeaderProps {
  height: Animated.AnimatedInterpolation<string | number>;
  paddingTop: Animated.AnimatedInterpolation<string | number>;
  marginBottom: Animated.AnimatedInterpolation<string | number>;
  bottom: Animated.AnimatedInterpolation<string | number>;
  flexDirection: flexType;
  alignItems: alignType;
  isLabels: boolean;
}

const AssetsHeader: React.FC<HeaderProps> = ({
  height,
  paddingTop,
  flexDirection,
  alignItems,
  marginBottom,
  bottom,
  isLabels,
}) => {
  const navigation = useNavigation();
  const {totalBalance} = useAssets();

  return (
    <Animated.View
      style={[
        styles.headerContainer,
        {height: height, flexDirection, alignItems},
      ]}>
      <Animated.View
        style={[
          styles.headerNavigation,
          {marginTop: paddingTop, marginBottom: marginBottom},
        ]}>
        <TouchableOpacity style={styles.navIcon}>
          <Icon
            name="chevron-left"
            size={22}
            color="white"
            onPress={() => navigation.navigate('main')}
          />
        </TouchableOpacity>
        <Text style={styles.navMenuText}>DIP</Text>
      </Animated.View>
      <Animated.Text style={[styles.balance, {}]}>
        {formatCurrency(totalBalance, true)}
      </Animated.Text>

      {isLabels && (
        <Animated.View style={[styles.options, {bottom}]}>
          <TouchableOpacity onPress={() => {}} style={styles.optionsItem}>
            <AntIcon name="pluscircleo" size={24} color={Colors.darkGrey} />
            <Text style={styles.optionLabel}>Top Up</Text>
          </TouchableOpacity>
          <View style={styles.line} />
          <TouchableOpacity onPress={() => {}} style={styles.optionsItem}>
            <MaterialCommunityIcons
              name="line-scan"
              size={24}
              color={Colors.darkGrey}
            />
            <Text style={styles.optionLabel}>Transfer</Text>
          </TouchableOpacity>
          <View style={styles.line} />
          <TouchableOpacity onPress={() => {}} style={styles.optionsItem}>
            <MaterialCommunityIcons
              name="qrcode-plus"
              size={24}
              color={Colors.darkGrey}
            />
            <Text style={styles.optionLabel}>Receive</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
      {/* {!isLabels && (
        <Icon name="menu" style={{paddingLeft: 30}} size={32} color="white" />
      )} */}
    </Animated.View>
  );
};

export default AssetsHeader;

const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    width: '100%',
    height: 205,
    paddingLeft: 24,
    paddingRight: 24,
    backgroundColor: Colors.purpleDark,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginBottom: 45,
    zIndex: 100,
    justifyContent: 'space-between',
  },
  navMenuText: {
    color: Colors.white,
    fontSize: 20,
    fontFamily: 'Bebas Neue',
    textTransform: 'uppercase',
  },
  headerNavigation: {
    marginBottom: 26,
    flexDirection: 'row',
    alignItems: 'center',
  },
  navIcon: {
    marginRight: 18,
  },
  balance: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    minWidth: 160,
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 16,
    bottom: -24,
  },
  optionsItem: {
    alignItems: 'center',
  },
  line: {
    width: 1,
    height: '100%',
    backgroundColor: '#E3E3E3',
  },
  optionLabel: {
    marginTop: 10,
    color: Colors.darkGrey,
  },
});
