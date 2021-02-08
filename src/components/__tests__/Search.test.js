import '@testing-library/jest-dom/extend-expect'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Search from 'components/Search'

test('Renders without crashing', () => {
  const searchText = 'Testing search'
  render(<Search text={searchText}/>)
  expect(screen.getByDisplayValue(searchText)).toBeInTheDocument()
})

test('Handle text change', () => {
  const onChange = jest.fn()
  const searchText = 'Testing search'

  render(<Search text={searchText} onChange={onChange}/>)
  userEvent.type(screen.getByRole('searchbox'), 'test')
  expect(onChange).toHaveBeenCalledTimes(4)
})

