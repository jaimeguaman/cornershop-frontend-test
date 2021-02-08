import '@testing-library/jest-dom/extend-expect'
import {render, screen} from '@testing-library/react'
import MessageBox from 'components/MessageBox'

test('Renders without crashing', () => {
  render(
    <MessageBox>
      <h2>Testing Message Box</h2>
    </MessageBox>
  )
  expect(screen.getByText('Testing Message Box')).toBeInTheDocument()
})
