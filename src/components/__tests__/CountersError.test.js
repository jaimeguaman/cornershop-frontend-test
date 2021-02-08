import '@testing-library/jest-dom/extend-expect'
import {render, screen} from '@testing-library/react'
import CountersError from 'components/CountersError'
import userEvent from '@testing-library/user-event'

test('Renders without crashing', () => {
  const mockedState = {
    loading: false,
    getCounters: jest.fn()
  }
  render(<CountersError state={mockedState}/>)
  expect(screen.getByText('Couldn\'t load the counters')).toBeInTheDocument()
})

test('When it is in loading state buttons should be disabled', () => {
  const mockedState = {
    loading: true,
    getCounters: jest.fn()
  }
  render(<CountersError state={mockedState}/>)
  expect(screen.getByRole('button', {name: /retry/i})).toBeDisabled()
})

test('Handle retry button click', () => {
  const mockedState = {
    loading: false,
    getCounters: jest.fn()
  }
  render(<CountersError state={mockedState}/>)
  userEvent.click(screen.getByRole('button', {name: /retry/i}))
  expect(mockedState.getCounters).toHaveBeenCalledTimes(1)
})
