import React, { Component } from 'react'
import { createPortal } from 'react-dom'

// get modal node from document
const modalRoot = document.getElementById('modal')

export default class Model extends Component {
  constructor(props) {
    super(props)
    // create node to show
    this.el = document.createElement('div')
  }
  //   append child to doucment and display it
  componentDidMount() {
    modalRoot.appendChild(this.el)
  }
  // Remove div after component unmounts
  componentWillUnmount() {
    modalRoot.removeChild(this.el)
  }

  //   render childern onto element
  render() {
    return createPortal(this.props.children, this.el)
  }
}
