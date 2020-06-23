const numberFormatter = Intl.NumberFormat('pt-BR');

export function formatNumber(value) {
  return numberFormatter.format(value);
}