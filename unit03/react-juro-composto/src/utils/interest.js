export function getTotal(capital, interestRate, term) {
  let percentage = ((interestRate / 100) + 1).toFixed(3);
  let total = (capital * (percentage ** term)).toFixed(2);
  return total;
}