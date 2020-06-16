import React, { Component } from 'react'
import { formatCurrency, formatPercentage } from '../utils/formatters';

export default class InputReadOnly extends Component {
  render() {
    const { label, value, percentage, color } = this.props;
    const id = label.replace(/\s/g, "");

    let value_formatted = '';
    if (!isNaN(percentage)) {
      value_formatted = `${formatCurrency(value)} (${formatPercentage(percentage)})`;
    } else {
      value_formatted = `${formatCurrency(value)}`;
    }

    let text_color = 'black-text';
    if (color !== undefined) {
      let color_cfg = color.split(" ");
      text_color = `${color_cfg[0]}-text`;
      if (color_cfg.length > 1) {
        text_color += ` text-${color_cfg[1]}`
      }
    }

    return (
      <div className="input-field col s3">
        <input
          disabled
          className={text_color}
          style={{ fontWeight: "bold" }}
          id={id}
          type="text"
          value={value_formatted}
        />
        <label
          className="active"
          htmlFor={id}
        >
          {label}
        </label>
      </div>
    )
  }
}
