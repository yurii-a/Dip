import React from 'react';
import {Text, View} from 'react-native';

import useAssets from '../../store';
//   import {useConnection} from '../../components/providers/ConnectionProvider';

const GetInfo = () => {
  const {assets, getAssets} = useAssets();

  getAssets();
  console.log(assets, 'assetsssss');

  return (
    <View>
      <Text>getInfo</Text>
    </View>
  );
};

export default GetInfo;
