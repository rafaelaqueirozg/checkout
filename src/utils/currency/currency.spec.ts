import { formatToBRLCurrency } from './currency';

describe('currency', () => {
  it('should format correctly', () => {
    const formatted = formatToBRLCurrency(198.47);
    expect(formatted).toContain('R$');
    expect(formatted).toContain('198,47');
  });

  it('should return - when value is zero', () => {
    const formatted = formatToBRLCurrency(0);
    expect(formatted).toContain('R$');
    expect(formatted).toContain('0,00');
  });

  it('should thrown an error if the value is falsy', () => {
    expect(() => formatToBRLCurrency(null as unknown as number)).toThrow(
      new Error('Value is invalid!')
    );
  });
});
