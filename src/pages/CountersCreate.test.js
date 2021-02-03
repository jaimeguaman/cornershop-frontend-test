import React from 'react'
import ReactDOM from 'react-dom'
import CountersCreate from 'pages/CountersCreate'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<CountersCreate />, div)
  ReactDOM.unmountComponentAtNode(div)
})
