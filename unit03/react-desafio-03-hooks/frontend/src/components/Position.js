import React from 'react'
import css from './position.module.css';

export default function Position({ children }) {
  return (
    <div className={`blue-grey-text text-lighten-5 ${css.position}`}>
      {children}
    </div>
  )
}
