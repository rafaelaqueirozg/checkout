export const formatToBRLCurrency = (value: number): string => {
  if (!value && value !== 0) throw new Error('Value is invalid!');

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};
