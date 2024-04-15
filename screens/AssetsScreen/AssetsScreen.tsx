import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import Colors from '../../styles/Colours';
import AssetsHeader from './AssetsHeader';
import TotalSection from './TotalSection';
import AirdropsSection from './AirdropsSection';
import PositionsSection from './PositionsSection';
import useAssets from '../../store';

const AssetsScreen = (navigation: any) => {
  const {getAssets, getPositions} = useAssets();

  useEffect(() => {
    getAssets();
    // getPositions();
  }, [getAssets, getPositions]);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <AssetsHeader />
      <View style={styles.mainContent}>
        <TotalSection navigation={navigation} />
        <AirdropsSection />
        <PositionsSection />
      </View>
    </SafeAreaView>
  );
};

export default AssetsScreen;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.purple,
    height: '100%',
  },
  mainContent: {
    paddingTop: 18,
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 18,
  },
});
