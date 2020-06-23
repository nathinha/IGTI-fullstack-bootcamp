import React from 'react'
import css from './card.module.css'

export default function Card({ children }) {
  return (
    <div className={`${css.card} card horizontal blue-grey darken-5`}>
      {children}
    </div>
  )
}
