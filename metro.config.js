/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const zetaSdkPath = '/Users/yurii/dev/zeta-sdk';

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
    nodeModulesPaths: [zetaSdkPath],
  },
  watchFolders: [zetaSdkPath],
};
