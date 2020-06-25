import React from 'react'

export default function Form({ data, onFormChange }) {
  const { capital, interestRate, period } = data;

  const onCapitalChange = (event) => {
    onFormChange(event.target.value, null, null);
  }

  const onInterestRateChange = (event) => {
    onFormChange(null, event.target.value, null);
  }

  const onTermChange = (event) => {
    onFormChange(null, null, event.target.value);
  }

  return (
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
  )
}
