import React from 'react';
import { formatCurrency, formatPercentage } from '../utils/formatter';


export default function Term({ data }) {
  const { id, total, interest, percentage } = data;
  return (
    <div className="col s2">
      <div className="row valign-wrapper">
        <div className="col">{id}</div>
        <div className="col">
          <div>{formatCurrency(total)}</div>
          <div>{formatCurrency(interest)}</div>
          <div>{formatPercentage(percentage)}</div>
        </div>
      </div>
    </div>
  )
}
