import React from 'react';
import { formatCurrency, formatPercentage } from '../utils/formatter';

export default function Terms({ data }) {
  return (
    <div className="terms row">
      {
        data.map((term) => {
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
  )
}
