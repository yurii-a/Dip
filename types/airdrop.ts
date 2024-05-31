import {ImageRequireSource} from 'react-native';

export class Airdrop {
  name: string;
  logo: ImageRequireSource;
  tokens: number | null;
  ticker: string;
  price: number | null;

  constructor(
    name: string,
    logo: ImageRequireSource,
    tokens: number,
    ticker: string,
    price: number,
  ) {
    this.name = name;
    this.logo = logo;
    this.tokens = tokens;
    this.ticker = ticker;
    this.price = price;
  }

  getValue(): number | null {
    if (this.tokens === null || this.price === null) {
      return null;
    }
    return this.tokens * this.price;
  }

  static createParcl(tokens: number) {
    return new Airdrop(
      'Parcl',
      require('../assets/img/parcl.png'),
      tokens,
      'PRCL',
      0.6,
    );
  }

  static createKamino(tokens: number) {
    return new Airdrop(
      'Kamino',
      require('../assets/img/kamino.png'),
      tokens,
      'KMNO',
      0.15,
    );
  }

  static createDrift(tokens: number) {
    return new Airdrop(
      'Drift',
      require('../assets/img/drift.png'),
      tokens,
      'DRIFT',
      2,
    );
  }
}
