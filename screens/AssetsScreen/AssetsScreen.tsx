import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import Colors from '../../styles/Colours';
import AssetsHeader from './AssetsHeader';
import TotalSection from './TotalSection';
import AirdropsSection from './AirdropsSection';
import PositionsSection from './PositionsSection';
import useAssets from '../../store';
// import GetZetaAccountButton from '../../components/zeta/GetZetaAccountButton';

interface IProps {
  navigation: any;
}
const AssetsScreen = ({navigation}: IProps) => {
  const {getAssets} = useAssets();

  useEffect(() => {
    getAssets();
  }, [getAssets]);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <AssetsHeader navigation={navigation} />
      <ScrollView style={styles.mainContent}>
        <TotalSection />
        <AirdropsSection />
        <PositionsSection />
      </ScrollView>
      {/* <GetZetaAccountButton /> */}
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
