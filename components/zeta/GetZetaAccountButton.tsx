import React from 'react';
import {Button} from 'react-native';

export default function GetZetaAccountButton({onComplete}) {
  return <Button title="Fetch" onPress={() => onComplete('Hello')} />;
}
