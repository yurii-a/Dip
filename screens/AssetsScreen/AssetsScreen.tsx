import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import Colors from '../../styles/Colours';
import AssetsHeader from './AssetsHeader';
import TotalSection from './TotalSection';
import AirdropsSection from './AirdropsSection';
import PositionsSection from './PositionsSection';
import useAssets from '../../store';
import {useAuthorization} from '../../components/providers/AuthorizationProvider';

interface IProps {
  navigation: any;
}
const AssetsScreen = ({navigation}: IProps) => {
  const {assets, positions, getAssets, getPositions} = useAssets();
  const {authorizeSession} = useAuthorization();

  useEffect(() => {
    getAssets();
    getPositions(authorizeSession);
  }, [authorizeSession, getAssets, getPositions]);
  console.log(assets, 'assets');
  console.log(positions, 'positions');
  return (
    <SafeAreaView style={styles.mainContainer}>
      <AssetsHeader navigation={navigation} />
      <ScrollView style={styles.mainContent}>
        <TotalSection />
        <AirdropsSection />
        <PositionsSection />
      </ScrollView>
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
