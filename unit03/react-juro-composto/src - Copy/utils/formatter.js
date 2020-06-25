const currencyFormatter = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
const percentageFormatter = Intl.NumberFormat('pt-BR', { style: 'percent', maximumFractionDigits: 2 });

export function formatCurrency(value) {
  return currencyFormatter.format(value);
}

export function formatPercentage(value) {
  return percentageFormatter.format(value);
}