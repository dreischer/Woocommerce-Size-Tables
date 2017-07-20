import React, { Component } from 'preact'

const config = {
  DATA_ELEMENT: '_size_table_data',
  CONTAINER_ELEMENT: 'size_table_container'
}

const data = getData()

class Cell extends Component {
  render (props, state) {
    return <input onKeyUp={props.onUpdate} type='text' value={props.val} />
  }
}

class Table extends Component {
  constructor (props) {
    super(props)
    this.state = Object.assign({
      sizes: ['S', 'M', 'L'],
      rows: [
        {
          measure: 'Neck',
          values: [20, 30, 40]
        },
        {
          measure: 'Waist',
          values: [10, 12, 14]
        }
      ]
    }, this.props)
  }

  componentDidUpdate () {
    setData(this.state)
  }

  addMeasure () {
    const rows = [...this.state.rows, {
      measure: 'XX',
      values: Array(this.state.sizes.length).fill(0)
    }]

    this.setState({ rows })
  }

  addSize () {
    const sizes = [...this.state.sizes, 'XX']
    const rows = this.state.rows.map(row => {
      const values = [...row.values, 0]
      return Object.assign(row, { values })
    })

    this.setState({ sizes, rows })
  }

  deleteMeasure () {
    const rows = this.state.rows.slice(0, -1)

    this.setState({ rows })
  }

  deleteSize () {
    const sizes = this.state.sizes.slice(0, -1)
    const rows = this.state.rows.map(row => {
      const values = row.values.slice(0, -1)
      return Object.assign(row, { values })
    })

    this.setState({ sizes, rows })
  }

  updateSize () {
    console.log('updateSize', this)
  }
  updateMeasure () {
    console.log('updateMeasure', this)
  }
  updateValue () {
    console.log('updateValue', this)
  }

  render (props, state) {
    const sizes = state.sizes.map(size => <th><Cell onUpdate={this.updateSize} val={size} /></th>)
    const firstRow = (
      <tr>
        <th />
        {sizes}
      </tr>
    )
    const rows = state.rows.map(row => {
      const values = row.values.map(size => <td><Cell onUpdate={this.updateValue} val={size} /></td>)
      return (
        <tr>
          <td><Cell onUpdate={this.updateMeasure} val={row.measure} /></td>
          {values}
        </tr>
      )
    })

    return (
      <div>
        <table>
          {firstRow}
          {rows}
        </table>
        <input type='button' className='btn' value='Add size' onClick={this.addSize.bind(this)} />
        <input type='button' className='btn' value='Add measure' onClick={this.addMeasure.bind(this)} />
        <input type='button' className='btn' value='Delete size' onClick={this.deleteSize.bind(this)} />
        <input type='button' className='btn' value='Delete measure' onClick={this.deleteMeasure.bind(this)} />
      </div>
    )
  }
}

React.render(<Table data={data} />, document.getElementById(config.CONTAINER_ELEMENT))

function setData (data) {
  console.log('set data: ', data)
  document.getElementById(config.DATA_ELEMENT).value = JSON.stringify(data)
}

function getData () {
  try {
    return JSON.parse(document.getElementById(config.DATA_ELEMENT).value)
  } catch (e) {
    return {}
  }
}
