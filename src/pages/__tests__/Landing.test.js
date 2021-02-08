import '@testing-library/jest-dom/extend-expect'
import {render, screen} from '@testing-library/react'
import Landing from 'pages/Landing'

test('Renders without crashing', () => {
  render(<Landing/>)
  expect(screen.getByText('Welcome to Counters')).toBeInTheDocument()
})
