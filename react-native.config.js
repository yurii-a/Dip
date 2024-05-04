const {execSync} = require('child_process');

const flipperEnabled = process.env.NO_FLIPPER !== '1';

module.exports = {
  assets: ['./assets/fonts'],
  dependencies: {
    'react-native-flipper': {
      platforms: {
        ios: flipperEnabled ? null : 'podspec',
        android: null,
      },
    },
  },
};
