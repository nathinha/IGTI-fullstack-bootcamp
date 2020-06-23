import React from 'react'

export default function Spinner({ description }) {
  return (
    <div className="center-align">
      <div className="preloader-wrapper small active">
        <div className="spinner-layer spinner-yellow-only">
          <div className="circle-clipper left">
            <div className="circle"></div>
          </div><div className="gap-patch">
            <div className="circle"></div>
          </div><div className="circle-clipper right">
            <div className="circle"></div>
          </div>
        </div>
      </div>
      <div>
        <h5>{description}</h5>
      </div>
    </div>
  )
}
