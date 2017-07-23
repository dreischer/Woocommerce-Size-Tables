import React, { Component } from 'preact'

export default class Cell extends Component {
  render (props, state) {
    return <input onKeyUp={props.onUpdate} type='text' value={props.val} disabled={props.disabled} />
  }
}
