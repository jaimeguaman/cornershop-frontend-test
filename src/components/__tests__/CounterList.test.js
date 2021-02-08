import '@testing-library/jest-dom/extend-expect'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {mockedCounters} from 'utils/testUtils'

import CounterList from 'components/CounterList'

function setupCounterListTestCommon () {
  const handleRefreshButton = jest.fn()
  const counters = mockedCounters
  return {
    handleRefreshButton,
    counters
  }
}

test('Render counter items correctly', () => {
  const {counters} = setupCounterListTestCommon()
  render(<CounterList counters={counters} isRefreshing={false} refreshTimes={0} />)

  counters.map(counter => {
    expect(screen.getByText(counter.title)).toBeInTheDocument()
  })
})

describe('Helper toolbar rendering tests', () => {

  test('Helper toolbar renders "Default" layout correctly', () => {
    const {counters} = setupCounterListTestCommon()
    render(<CounterList counters={counters} isRefreshing={false} refreshTimes={2} />)
    expect(screen.getByText(`${counters.length} Items`)).toBeInTheDocument()
    expect(screen.getByText('2 Times')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /refresh/i })).toBeInTheDocument()
  })

  test('Helper toolbar renders "Refreshing" layout when counters state is refreshing', () => {
    const {counters} = setupCounterListTestCommon()
    render(<CounterList counters={counters} isRefreshing={true} refreshTimes={0} />)
    expect(screen.getByText(`${counters.length} Items`)).toBeInTheDocument()
    expect(screen.getByText('Refreshing...')).toBeInTheDocument()
  })

  test('Helper toolbar renders "Selected" layout correctly when there are selected counters', () => {
    const {counters} = setupCounterListTestCommon()
    const selectedCounters = counters.map(counter => {
      counter.selected = true
      return counter
    })

    render(<CounterList counters={selectedCounters} isRefreshing={false} refreshTimes={0} />)
    expect(screen.getByText(`${counters.length} Selected`)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /refresh/i })).toBeInTheDocument()
  })

  test('Helper toolbar with "Selected" layout handles refresh', () => {
    const {counters, handleRefreshButton} = setupCounterListTestCommon()

    const selectedCounters = counters.map(counter => {
      counter.selected = true
      return counter
    })

    render(<CounterList counters={selectedCounters} isRefreshing={false} refreshTimes={0} onRefresh={handleRefreshButton} />)

    userEvent.click(screen.getByRole('button', {name: /refresh/i}))
    expect(handleRefreshButton).toHaveBeenCalledTimes(1)

  })

  test('Helper toolbar with "Default" layout handles refresh', () => {
    const {counters, handleRefreshButton} = setupCounterListTestCommon()

    render(<CounterList counters={counters} isRefreshing={false} refreshTimes={0} onRefresh={handleRefreshButton} />)

    userEvent.click(screen.getByRole('button', {name: /refresh/i}))
    expect(handleRefreshButton).toHaveBeenCalledTimes(1)

  })
})



