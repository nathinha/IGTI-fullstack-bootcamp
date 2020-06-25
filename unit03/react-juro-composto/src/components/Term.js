import React from 'react';
import { formatCurrency, formatPercentage } from '../utils/formatter';


export default function Term({ data }) {
  const { id, total, interest, percentage } = data;

  let classValue = interest < 0 ? "red-text" : "light-green-text";
  let classPercentage = interest < 0 ? "orange-text" : "light-blue-text"
  let classBold = { fontWeight: 700 }

  return (
    <div className="col s2">
      <div style={{ paddingLeft: "10px" }} className="z-depth-1">
        <div className="row valign-wrapper">
          <div style={classBold} className="col">{id}</div>
          <div className="col">
            <div style={classBold} className={classValue}>{formatCurrency(total)}</div>
            <div style={classBold} className={classValue}>{formatCurrency(interest)}</div>
            <div className={classPercentage}>{formatPercentage(percentage)}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
