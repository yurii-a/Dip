import React from 'react';
import {Button} from 'react-native';

import {alertAndLog} from '../../util/alertAndLog';

export default function GetZetaAccountButton() {
  return (
    <Button
      title="Fetch"
      onPress={async () => {
        alertAndLog(
          'Get Account is trigerred',
          'Reaching here means that the button is working',
        );
      }}
    />
  );
}
