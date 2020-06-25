export function getInterest(capital, interestRate, term) {
  let interest = capital * ((1 + interestRate) ** term);
  return interest;
}