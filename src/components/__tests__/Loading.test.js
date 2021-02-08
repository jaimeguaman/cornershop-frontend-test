import '@testing-library/jest-dom/extend-expect'
import {render, screen} from '@testing-library/react'
import Loading from 'components/Loading'

test('Renders without crashing', () => {
  render(<Loading/>)
  expect(screen.getByRole('presentation')).toBeInTheDocument()
})
