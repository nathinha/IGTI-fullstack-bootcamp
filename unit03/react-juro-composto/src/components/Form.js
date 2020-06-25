import React from 'react'
import Input from './Input';

export default function Form({ data, onFormChange }) {
  const { capital, interestRate, period } = data;

  const onCapitalChange = (value) => {
    onFormChange(value, null, null);
  }

  const onInterestRateChange = (value) => {
    onFormChange(null, value, null);
  }

  const onTermChange = (value) => {
    onFormChange(null, null, value);
  }

  return (
    <div className="form row">
      <form>
        <Input
          id="capital"
          label="Capital"
          value={capital}
          constraints={{ min: "0", max: "100000", step: "100" }}
          onInputChange={onCapitalChange}
        />
        <Input
          id="interest_rate"
          label="Interest Rate (% a.m.)"
          value={interestRate}
          constraints={{ min: "-12", max: "12", step: "0.1" }}
          onInputChange={onInterestRateChange}
        />
        <Input
          id="period"
          label="Period (months)"
          value={period}
          constraints={{ min: "1", max: "36", step: "1" }}
          onInputChange={onTermChange}
        />
      </form>
    </div>
  )
}
