import React from 'react'
import CountUp from 'react-countup'

export default function Votes({ value, previous }) {
  return (
    <div>
      <CountUp
        start={previous}
        end={value}
        duration={0.6}
        separator="."
      >
        {({ countUpRef }) => (
          <div>
            <span ref={countUpRef} />
          </div>
        )}
      </CountUp>
    </div>
  )
}
