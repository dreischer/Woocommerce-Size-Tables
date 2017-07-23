import React from 'preact'
import Table from './Table'
import './style.css'

const config = {
  DATA_ELEMENT: '_size_table_data',
  CONTAINER_ELEMENT: 'size_table_container'
}

React.render(<Table data={getData()} onUpdate={setData} />, document.getElementById(config.CONTAINER_ELEMENT))

function setData (data) {
  document.getElementById(config.DATA_ELEMENT).value = JSON.stringify(data)
}

function getData () {
  try {
    return JSON.parse(document.getElementById(config.DATA_ELEMENT).value)
  } catch (e) {
    return {}
  }
}
