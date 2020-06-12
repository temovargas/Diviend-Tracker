import React from 'react'

export default function FormContainer(props) {
  return (
    <form onSubmit={props.onSubmit} className={props.className}>
      {props.children}
    </form>
  )
}
