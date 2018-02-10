/* eslint react/prop-types: 0 */
import React, { Component } from 'preact'
import Cell from './Cell'

export default class Table extends Component {
  constructor (props) {
    super(props)
    this.state = Object.assign({}, require('./default-data'), this.props.data)
  }

  componentDidUpdate () {
    this.props.onUpdate(this.state)
  }

  addColumn () {
    const sizes = this.state.sizes.map(row => [...row, ''])
    this.setState({ sizes })
  }

  addRow () {
    const current = this.state.sizes.slice(0)
    const lastRow = current[current.length - 1].slice(0)
    const sizes = [...current, lastRow]
    this.setState({ sizes })
  }

  deleteColumn () {
    const sizes = this.state.sizes.map(row => row.slice(0, -1))
    this.setState({ sizes })
  }

  deleteRow () {
    const sizes = this.state.sizes.slice(0, -1)
    this.setState({ sizes })
  }

  updateData (row, column, value) {
    const clone = this.state.sizes.slice(0)
    clone[row][column] = value
    this.setState({ sizes: clone })
  }

  getTableContent (sizes) {
    return sizes.map((row, i) => {
      const columns = row.map((val, j) => {
        const update = (e) => this.updateData(i, j, e.currentTarget.value)
        const cell = <Cell onUpdate={update} val={val} />
        return i === 0 ? <th>{cell}</th> : <td>{cell}</td>
      })

      return <tr>{columns}</tr>
    })
  }

  render (props, state) {
    const sizes = this.getTableContent(state.sizes)

    return (
      <div className='size-table'>
        <table>{sizes}</table>
        <input type='button' className='btn add columns' value='Add column' onClick={this.addColumn.bind(this)} />
        <input type='button' className='btn add row' value='Add row' onClick={this.addRow.bind(this)} />
        <input type='button' className='btn delete columns' value='Delete column' onClick={this.deleteColumn.bind(this)} />
        <input type='button' className='btn delete row' value='Delete row' onClick={this.deleteRow.bind(this)} />
      </div>
    )
  }
}
