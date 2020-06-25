import React from 'react';
import Term from './Term';
export default function Terms({ data }) {
  return (
    <div className="terms row">
      {
        data.map((term) => {
          return (term.total > 0 && term.interest !== 0 && <Term key={term.id} data={term} />
          )
        })
      }
    </div>
  )
}
