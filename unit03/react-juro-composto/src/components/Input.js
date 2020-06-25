import React from 'react'

export default function Input({ id, label, value, constraints, onInputChange }) {
  const { min, max, step } = constraints;

  const onChange = (event) => {
    onInputChange(+event.target.value);
  }

  return (
    <div className="input-field col s4">
      <input
        id={id}
        type="number"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={onChange}
      />
      <label
        className="active"
        htmlFor={id}>
        {label}
      </label>
    </div>
  )
}
