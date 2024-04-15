import React from 'react';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../styles/Colours';
import useAssets from '../../store';
import {useNavigation} from '@react-navigation/native';

const AssetsHeader = () => {
  const navigation = useNavigation();
  const {totalBalance} = useAssets();

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerNavigation}>
        <TouchableOpacity style={styles.navIcon}>
          <Icon
            name="chevron-left"
            size={22}
            color="white"
            onPress={() => navigation.navigate('main')}
          />
        </TouchableOpacity>
        <Text style={styles.navMenuText}>DIP</Text>
      </View>
      <Text style={styles.balance}>${totalBalance.toFixed(2)}</Text>

      <View style={styles.options}>
        <TouchableOpacity onPress={() => {}} style={styles.optionsItem}>
          <AntIcon name="pluscircleo" size={24} color={Colors.darkGray} />
          <Text style={styles.optionLabel}>Top up</Text>
        </TouchableOpacity>
        <View style={styles.line} />
        <TouchableOpacity onPress={() => {}} style={styles.optionsItem}>
          <MaterialCommunityIcons
            name="line-scan"
            size={24}
            color={Colors.darkGray}
          />
          <Text style={styles.optionLabel}>Transfer</Text>
        </TouchableOpacity>
        <View style={styles.line} />
        <TouchableOpacity onPress={() => {}} style={styles.optionsItem}>
          <MaterialCommunityIcons
            name="qrcode-plus"
            size={24}
            color={Colors.darkGray}
          />
          <Text style={styles.optionLabel}>Recieve</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AssetsHeader;

const styles = StyleSheet.create({
  headerContainer: {
    height: 205,
    paddingLeft: 24,
    paddingRight: 24,
    backgroundColor: Colors.purpleDark,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginBottom: 45,
  },
  headerNavigation: {
    marginTop: 50,
    marginBottom: 26,
    flexDirection: 'row',
    alignItems: 'center',
  },
  navIcon: {
    marginRight: 18,
  },
  navMenuText: {
    color: 'white',
    fontSize: 20,
    textTransform: 'uppercase',
  },
  balance: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
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
    color: Colors.darkGray,
  },
});

