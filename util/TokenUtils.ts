export default function getImage(token_name: string) {
  const tokenImages: {[key: string]: string} = {
    SOL: require('../assets/img/sol.png'),
    JUP: require('../assets/img/jup.png'),
    ETH: require('../assets/img/eth.png'),
    PRCL: require('../assets/img/parcl.png'),
    KMNO: require('../assets/img/kamino.png'),
    DRIFT: require('../assets/img/drift.png'),
    TNSR: require('../assets/img/tensor.png'),
    PLACEHOLDER: require('../assets/img/ic_token.png'), // Default image
  };

  let name = token_name.toUpperCase();
  return tokenImages[name] || tokenImages.PLACEHOLDER;
}
