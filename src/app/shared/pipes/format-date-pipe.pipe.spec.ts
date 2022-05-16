import { FormatDatePipe } from './format-date.pipe';

describe('FormatDatePipe', () => {
  it('create an instance', () => {
    const pipe = new FormatDatePipe();
    expect(pipe).toBeTruthy();
  });

  it('transforms 1234 to R$ 1.234,00', () => {
    const pipe = new FormatDatePipe();
    expect(pipe.transform('2020-02-09T18:20:32Z')).toBe('09/02/2020');
  });
});
