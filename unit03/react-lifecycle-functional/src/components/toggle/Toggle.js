import React from 'react'

export default function Toggle(props) {
  const { enabled, description, onToggle } = props;

  const handleChange = (event) => {
    onToggle(event.target.checked);
  }

  return (
    <div className="switch">
      <label>
        {description}
        <input type="checkbox" checked={enabled} onChange={handleChange} />
        <span className="lever"></span>
      </label>
    </div>
  )
}