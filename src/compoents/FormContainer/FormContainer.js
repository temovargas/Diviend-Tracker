import React from 'react'
import './FormContainer.css'
export default function FormContainer(props) {
  return (
    <form onSubmit={props.onSubmit} className={props.className}>
      {props.children}
    </form>
  )
}
