import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import Colors from '../../styles/Colours';
import AssetsHeader from './AssetsHeader';
import TotalSection from './TotalSection';
import AirdropsSection from './AirdropsSection';
import PositionsSection from './PositionsSection';
import {
  useAuthorization,
  Account,
} from '../../components/providers/AuthorizationProvider';
import {useConnection} from '../../components/providers/ConnectionProvider';

interface IProps {
  navigation: any;
}
const AssetsScreen = ({navigation}: IProps) => {
  const {selectedAccount} = useAuthorization();
  const {connection} = useConnection();
  const [data, setData] = useState<Number>(0);
  const [positions, setPositions] = useState(null);

  const fetchAndUpdateBalance = useCallback(
    async (account: Account) => {
      const fetchedBalance = await connection.getBalance(account.publicKey);
      const accountInfo = await connection.getAccountInfo(account.publicKey);
      setPositions(accountInfo.data);
      setData(fetchedBalance / 1e9);
    },
    [connection],
  );

  useEffect(() => {
    fetchAndUpdateBalance(selectedAccount);
  }, [selectedAccount]);

  console.log(data, 'balance xxx');
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
