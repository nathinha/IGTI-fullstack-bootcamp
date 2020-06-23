import React from 'react'

import css from './picture.module.css';

export default function Picture({ imgSrc, imgAlt }) {
  return (
    <div>
      <img className={`circle ${css.picture}`} src={imgSrc} alt={imgAlt} title={imgAlt} />
    </div>
  )
}
