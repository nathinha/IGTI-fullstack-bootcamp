import React from 'react'

export default function Header({ title }) {
  return (
    <div className="center-align">
      <h1 className="light-blue-text text-darken-4">
        {title}
      </h1>
    </div>
  )
}
