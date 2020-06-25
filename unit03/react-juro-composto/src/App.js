import React, { useState, useEffect } from 'react';
import { getTotal } from './utils/interest';
import { formatCurrency, formatPercentage } from './utils/formatter';
import Form from './components/Form';


export default function App() {
  const [capital, setCapital] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [period, setPeriod] = useState(0);
  const [termsInfo, setTermsInfo] = useState([]);

  useEffect(() => {
    let terms = [];
    for (let i = 0; i < period; i++) {
      let total = getTotal(capital, interestRate, period);
      let interest = total - capital;
      let percentage = capital > 0 ? (total / capital) - 1 : 0;

      terms.push({
        id: i,
        total,
        interest,
        percentage
      });
    }

    setTermsInfo(terms);
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
          termsInfo.map((term) => {
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
