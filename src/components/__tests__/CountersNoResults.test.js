import '@testing-library/jest-dom/extend-expect'
import {render, screen} from '@testing-library/react'
import CountersNoResults from 'components/CountersNoResults'

test('Renders without crashing', () => {
  render(<CountersNoResults/>)
  expect(screen.getByText('No results')).toBeInTheDocument()
})
