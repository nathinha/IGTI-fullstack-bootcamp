import React, { useState, useEffect } from 'react';
import { getTotal } from './utils/interest';
import { formatCurrency, formatPercentage } from './utils/formatter';


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
        id: period,
        total,
        interest,
        percentage
      });
    }

    setTermsInfo(terms);
  }, [capital, interestRate, period]);

  const onCapitalChange = (event) => {
    setCapital(event.target.value);
  }

  const onInterestRateChange = (event) => {
    setInterestRate(event.target.value);
  }

  const onTermChange = (event) => {
    setPeriod(event.target.value);
  }

  return (
    <div className="container">
      <h1 className="center">React - Juros Compostos</h1>
      <div className="form row">
        <form>
          <div className="input-field col s4">
            <input
              id="capital"
              type="number"
              value={capital}
              min="0"
              max="100000"
              step="100"
              onChange={onCapitalChange}
            />
            <label
              className="active"
              htmlFor="capital">
              Capital
            </label>
          </div>
          <div className="input-field col s4">
            <input
              id="interest_rate"
              type="number"
              value={interestRate}
              min="-12"
              max="12"
              step="0.1"
              onChange={onInterestRateChange}
            />
            <label
              className="active"
              htmlFor="interest_rate">
              Interest Rate
            </label>
          </div>
          <div className="input-field col s4">
            <input
              id="term"
              type="number"
              value={period}
              min="1"
              max="36"
              onChange={onTermChange}
            />
            <label
              className="active"
              htmlFor="term">
              Term
            </label>
          </div>
        </form>
      </div>
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
