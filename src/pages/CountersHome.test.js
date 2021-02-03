
import React from 'react'
import ReactDOM from 'react-dom'
import CountersHome from 'pages/CountersHome'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<CountersHome />, div)
  ReactDOM.unmountComponentAtNode(div)
})
