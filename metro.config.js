/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
// const zetaSdkPath = '/Users/yurii/dev/zeta-sdk';

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    // nodeModulesPaths: [zetaSdkPath],
    extraNodeModules: {
      // crypto: require.resolve('crypto-browserify'),
      fs: require.resolve('react-native-fs'),
      os: require.resolve('os-browserify'),
      path: require.resolve('path-browserify'),
      // stream: require.resolve('readable-stream'),
      url: require.resolve('react-native-url-polyfill'),
      // zlib: require.resolve('browserify-zlib'),
    },
  },
  // watchFolders: [zetaSdkPath],
};
