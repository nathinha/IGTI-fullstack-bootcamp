import React, { useState, useEffect } from 'react';
import InputNumber from './components/InputNumber';
import { getInterest } from './utils/interest'


export default function App() {
  const [capital, setCapital] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [term, setTerm] = useState(0);

  useEffect(() => {
    let interest = getInterest(capital, interestRate, term);
    console.log(capital);
    console.log(interestRate);
    console.log(term);
    console.log(interest);
  }, [capital, interestRate, term]);

  const handleCapitalChange = (value) => {
    setCapital(value);
  }

  const handleInterestChange = (value) => {
    setInterestRate(value);
  }

  const handleTermChange = (value) => {
    setTerm(value);
  }

  return (
    <div className="container">
      <h1 className="center">React - Juros Compostos</h1>
      <div className="row">
        <form>
          <InputNumber
            title="Capital"
            value={capital}
            min="0"
            max="100000"
            step="100"
            onInputChange={handleCapitalChange}
          />
          <InputNumber
            title="Interest Rate"
            value={interestRate}
            min="-12"
            max="12"
            step="0.1"
            onInputChange={handleInterestChange}
          />
          <InputNumber
            title="Term"
            value={term}
            min="1"
            max="36"
            onInputChange={handleTermChange}
          />
        </form>
      </div>
      <div className="row">
        <div>
          <span>Tempo</span>
          <span>amount</span>
          <span>Juros</span>
          <span>Juros (%)</span>
        </div>
      </div>
    </div>
  );
}
