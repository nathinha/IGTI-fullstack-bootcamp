import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import { formatCurrency, formatPercentage } from './utils/formatter';

export default function App() {
  const [capital, setCapital] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [period, setPeriod] = useState(0);
  const [terms, setTerms] = useState([]);

  useEffect(() => {
    const newTerms = [];

    for (let idx = 1; idx <= period; idx++) {
      let total = (capital * (((interestRate / 100) + 1) ** idx)).toFixed(2);
      let percentage = total > 0 ? (total / capital) - 1 : 0;

      newTerms.push({
        id: idx,
        total,
        interest: total - capital,
        percentage,
      });
    }

    setTerms(newTerms);
  }, [capital, interestRate, period]);

  const onFormChange = (newCapital, newInterestRate, newPeriod) => {
    if (newCapital !== null) {
      setCapital(newCapital);
      return;
    }

    if (newInterestRate !== null) {
      setInterestRate(newInterestRate);
      return;
    }

    if (newPeriod !== null) {
      setPeriod(newPeriod);
      return;
    }
  }

  return (
    <div className="container">
      <h1 className="center">React - Juros Compostos</h1>
      <Form
        data={{ capital, interestRate, period }}
        onFormChange={onFormChange}
      />
      <div className="terms row">
        {
          terms.map((term) => {
            return (term.total > 0 &&
              <div key={term.id} className="col s2">
                <div className="row valign-wrapper">
                  <div className="col">{term.id}</div>
                  <div className="col">
                    <div>{formatCurrency(term.total)}</div>
                    <div>{formatCurrency(term.interest)}</div>
                    <div>{formatPercentage(term.percentage)}</div>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}
