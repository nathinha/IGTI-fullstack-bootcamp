import React from 'react'

const STARS = {
  full: '★',
  empty: '☆'
}

const MAX_STARS = 10;

export default function Popularity({ value }) {
  const fullStars = STARS.full.repeat(value);
  const emptyStars = STARS.empty.repeat(MAX_STARS - value)

  return (
    <div className="yellow-text">
      <h5>{fullStars}{emptyStars}</h5>
    </div>
  )
}
