import {ImageRequireSource} from 'react-native';

export class Airdrop {
  name: string;
  logo: ImageRequireSource;
  tokens: number | null;

  constructor(name: string, logo: ImageRequireSource, tokens: number) {
    this.name = name;
    this.logo = logo;
    this.tokens = tokens;
  }

  static createParcl(tokens: number) {
    return new Airdrop('Parcl', require('../assets/img/parcl.png'), tokens);
  }

  static createKamino(tokens: number) {
    return new Airdrop('Kamino', require('../assets/img/kamino.png'), tokens);
  }

  static createDrift(tokens: number) {
    return new Airdrop('Drift', require('../assets/img/drift.png'), tokens);
  }
}
