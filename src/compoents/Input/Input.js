import React from 'react'
import './Input.css'

const Input = props => {
  console.log(props)
  return (
    <div className="form-group">
      <label htmlFor={props.name} className="form-label">
        {props.title}
      </label>
      <input
        className={`form-input ${props.className}`}
        id={props.name}
        name={props.name}
        type={props.type}
        onChange={props.handleChange}
        value={props.value}
        placeholder={props.placeholder}
      />
    </div>
  )
}

export default Input
