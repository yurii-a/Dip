import 'text-encoding-polyfill';
import {
  ConnectionProvider,
  RPC_ENDPOINT,
} from './components/providers/ConnectionProvider';
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {AuthorizationProvider} from './components/providers/AuthorizationProvider';
import {Header} from './components/Header';

import MainScreen from './screens/MainScreen';

export default function App() {
  return (
    <ConnectionProvider
      config={{commitment: 'processed'}}
      endpoint={RPC_ENDPOINT}>
      <AuthorizationProvider>
        <SafeAreaView style={styles.shell}>
          <Header />
          <MainScreen />
        </SafeAreaView>
      </AuthorizationProvider>
    </ConnectionProvider>
  );
}

const styles = StyleSheet.create({
  shell: {
    height: '100%',
  },
});
