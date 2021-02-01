
import React from 'react'
import ReactDOM from 'react-dom'
import Counters from 'pages/Counters'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Counters />, div)
  ReactDOM.unmountComponentAtNode(div)
})
