const currencyFormatter = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
const percentageFormatter = Intl.NumberFormat('pt-BR', { style: 'percent', maximumFractionDigits: 2 });
const percentageFormatterUS = Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 2 });

export function formatCurrency(value) {
  return currencyFormatter.format(value);
}

export function formatPercentage(value) {
  return percentageFormatter.format(value);
}

export function formatPercentageUS(value) {
  return percentageFormatterUS.format(value);
}