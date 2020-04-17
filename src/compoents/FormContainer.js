import React from 'react'

export default function FormContainer(props) {
  return <form className={props.className}>{props.children}</form>
}
