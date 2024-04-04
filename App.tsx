import 'text-encoding-polyfill';
import { ConnectionProvider } from './components/providers/ConnectionProvider';
import React from 'react';
import { AuthorizationProvider } from './components/providers/AuthorizationProvider';
import MainScreen from './screens/MainScreen';
import AssetsScreen from './screens/AssetsScreen/AssetsScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <ConnectionProvider config={{ commitment: 'confirmed' }}>
      <AuthorizationProvider>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="main" component={MainScreen} />
            <Tab.Screen name="assets" component={AssetsScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </AuthorizationProvider>
    </ConnectionProvider>
  );
}
