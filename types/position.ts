enum Dex {
  ZETA = 'Zeta',
  DRIFT = 'Drift',
  PARCL = 'Parcl',
}
export default Dex;

export interface Position {
  asset: string;
  exchange: Dex;
  entryPrice: number;
  markPrice: number;
  size: number;
  pnl: number;
}
