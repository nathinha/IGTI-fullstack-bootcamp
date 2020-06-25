import React from 'react';

export default function InputNumber(props) {
  const {
    title,
    value,
    min,
    max,
    step,
    onInputChange
  } = props;
  let id = title.replace(/ /g, '_').toLowerCase();

  const handleInputChange = (event) => {
    onInputChange(event.target.value);
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
        onChange={handleInputChange}
      />
      <label className="active" htmlFor={id}>{title}</label>
    </div>
  )
}
