import React, { useCallback, useEffect, useState } from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";

import { Section } from "../components/Section";
import ConnectButton from "../components/ConnectButton";
import AccountInfo from "../components/AccountInfo";
import {
  useAuthorization,
  Account,
} from "../components/providers/AuthorizationProvider";
import { useConnection } from "../components/providers/ConnectionProvider";
import ZetaSection from "../components/zeta/ZetaSection";
import { Header } from "../components/Header";
interface IProps {
  navigation: any; // Adjust type according to your navigation prop type
}
export default function MainScreen({ navigation }: IProps) {
  const { connection } = useConnection();
  const { selectedAccount } = useAuthorization();
  const [balance, setBalance] = useState<number | null>(null);

  const fetchAndUpdateBalance = useCallback(
    async (account: Account) => {
      console.log("Fetching balance for: " + account.publicKey);
      const fetchedBalance = await connection.getBalance(account.publicKey);
      console.log("Balance fetched: " + fetchedBalance);
      setBalance(fetchedBalance);
    },
    [connection]
  );

  useEffect(() => {
    if (!selectedAccount) {
      return;
    }
    fetchAndUpdateBalance(selectedAccount);
  }, [fetchAndUpdateBalance, selectedAccount]);

  return (
    <>
      <Header />
      <Button title="ASSETS" onPress={() => navigation.navigate("assets")} />
      <View style={styles.mainContainer}>
        {selectedAccount ? (
          <>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              <>
                <Section title="Get Zeta Account">
                  <ZetaSection />
                </Section>
              </>
            </ScrollView>
            <AccountInfo
              selectedAccount={selectedAccount}
              balance={balance}
              fetchAndUpdateBalance={fetchAndUpdateBalance}
            />
          </>
        ) : (
          <View style={{ marginTop: "auto" }}>
            <ConnectButton title="Connect wallet" />
          </View>
        )}
        <Text>Selected cluster: {connection.rpcEndpoint}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    padding: 16,
    flex: 1,
  },
  scrollContainer: {
    height: "100%",
  },
  buttonGroup: {
    flexDirection: "column",
    paddingVertical: 4,
  },
});
