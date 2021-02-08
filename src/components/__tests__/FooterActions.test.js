import '@testing-library/jest-dom/extend-expect'
import {render, screen} from '@testing-library/react'
import FooterActions from 'components/FooterActions'

test('Renders without crashing', () => {
  render(
    <FooterActions>
      <h2>Testing Footer Actions</h2>
    </FooterActions>
  )
  expect(screen.getByText('Testing Footer Actions')).toBeInTheDocument()
})
