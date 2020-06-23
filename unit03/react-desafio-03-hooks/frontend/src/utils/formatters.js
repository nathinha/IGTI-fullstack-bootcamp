const formatterNumber = Intl.NumberFormat('pt-BR');
const formatterPercentage = Intl.NumberFormat('pt-BR', { style: 'percent', maximumFractionDigits: 2 });

export function formatNumber(number) {
  return formatterNumber.format(number);
}

export function formatPercentage(number) {
  return formatterPercentage.format(number);
}