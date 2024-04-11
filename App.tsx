import 'text-encoding-polyfill';
import React from 'react';
import MainScreen from './screens/MainScreen';
import AssetsScreen from './screens/AssetsScreen/AssetsScreen';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="main"
          component={MainScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="assets"
          component={AssetsScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
