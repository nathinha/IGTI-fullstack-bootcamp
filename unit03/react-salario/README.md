# Salary Calculator

## Objectives

Create, using React, an application named 'react-salario' that should be able to calculate the net salary from gross salary, considering the 2020 CLT rules.

To exercise some concepts as:

- Javascript
  - Class Components
- React
- Materialize

## Requirements

- For rules the following site shall be considered as reference: 'https://www.todacarreira.com/calculo-salario-liquido/'

- The following fields shall be presented:
  - Gross salary (editable)
  - Base salary for INSS discount (read-only)
  - INSS discount (read-only)
  - Base salary for IRPF discount (read-only)
  - IRPF discount (read-only)
  - Net salary (read-only)
- An horizontal bar, presenting with diferent colors the following data:
  - INSS discount percentage
  - IRPF discount percentage
  - Net salary
- The sum of the three items above shall sum 100% of gross salary.
- The CLT rules are more complex than what will be calculated here, so you should ignore discounts other than INSS and IRPF and dependents.
- Implementation shall use Class Components.

## Development Tips

- For the horizontal bar, use the Determinate Linear Preloader available on Materialize.

```
  <div class="progress">
      <div class="determinate" style="width: 20%"></div>
      <div class="determinate" style="width: 10%"></div>
  </div>
```

- As the bar shall be a sum of net salary and IRPF and INSS discounts, you can consider the background color as the net salary bar.
- For the other two bars, you will use the determinate class. Remember that the first one declared will be overlapped by the second. So a tip is to add the value to be presented in the latter to the former and set the calculated width to the former.
- For the percentages and currency formatting, use the Intl library.

```
const currencyFormatter = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
const percentageFormatter = Intl.NumberFormat('pt-BR', { style: 'percent', maximumFractionDigits: 2 });
```
