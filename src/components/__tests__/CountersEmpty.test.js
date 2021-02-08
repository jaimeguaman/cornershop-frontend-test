import '@testing-library/jest-dom/extend-expect'
import {render, screen} from '@testing-library/react'
import CountersEmpty from 'components/CountersEmpty'

test('Renders without crashing', () => {
  render(<CountersEmpty/>)
  expect(screen.getByText('No counters yet')).toBeInTheDocument()
})
