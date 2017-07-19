import React, { Component } from 'preact'

const config = {
  DATA_ELEMENT: '_size_table_data',
  CONTAINER_ELEMENT: 'size_table_container'
}

const data = getData()

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
      measure: '',
      values: []
    }]

    this.setState({ rows })
  }
  deleteMeasure () {
    const sizes = this.state.sizes.slice(0, -1)
    const rows = this.state.rows.map(row => {
      return Object.assign(row, {
        values: row.values.slice(0, -1)
      })
    })

    this.setState({ sizes, rows })
  }
  addSize () {
    const sizes = [...this.state.sizes, '']
    const rows = this.state.rows.map(row => {
      return Object.assign(row, {
        values: [...row.values, '']
      })
    })

    this.setState({ sizes, rows })
  }
  deleteSize () {

  }
  render (props, state) {
    const headings = state.sizes.map(size => <th>{size}</th>)
    headings.unshift(<th />)

    const rows = state.rows.map(row => {
      const values = row.values.map(size => <td>{size}</td>)
      return (
        <tr>
          <td>{row.measure}</td>
          {values}
        </tr>
      )
    })

    return (
      <div>
        <table>
          <tr>{headings}</tr>
          {rows}
        </table>
        <div className='add-size' onClick={this.addSize.bind(this)}>Add size</div>
        <div className='add-measure' onClick={this.addMeasure.bind(this)}>Add measure</div>
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
