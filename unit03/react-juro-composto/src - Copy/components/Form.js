import React from 'react';
import InputNumber from './components/InputNumber';

export default function Form(props) {
  const { capital, interestRate, term } = props;
  return (
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
  )
}
