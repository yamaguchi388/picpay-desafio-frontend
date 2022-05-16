import { FormatCoinPipe } from './format-coin.pipe';

describe('FormatCoinPipe', () => {
  it('create an instance', () => {
    const pipe = new FormatCoinPipe();
    expect(pipe).toBeTruthy();
  });

  // it('transforms 12 to R$ 12,00', () => {
  //   const pipe = new FormatCoinPipe();
  //   expect(pipe.transform(12, 'BRL')).toEqual('R$ 12,00');
  // });
});