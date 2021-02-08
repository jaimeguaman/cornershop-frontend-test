import '@testing-library/jest-dom/extend-expect'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {mockedCounters} from 'utils/testUtils'

import CounterItem from 'components/CounterItem'


function setupCounterItemTestCommon (options = {count: 0}) {
  const handleChange = jest.fn()
  const toggleSelected = jest.fn()
  const mockedCounter = mockedCounters[0]
  mockedCounter.count = options.count

  return {
    handleChange,
    toggleSelected,
    mockedCounter
  }
}

test('Renders without crashing', () => {
  const {mockedCounter} = setupCounterItemTestCommon()
  render(<CounterItem
    key={mockedCounter.id}
    item={mockedCounter}
  />)

  expect(screen.getByText(mockedCounter.title)).toBeInTheDocument()
})

test('Handle increment', () => {
  const {handleChange, mockedCounter} = setupCounterItemTestCommon()

  render(<CounterItem
    onCountChanged={handleChange}
    key={mockedCounter.id}
    item={mockedCounter}
  />)

  userEvent.click(screen.getByRole('button', {name: /increment/i}))

  expect(handleChange).toHaveBeenCalledTimes(1)
  expect(handleChange).toHaveBeenCalledWith( mockedCounter.id, 1)
})

test('Handle decrement when counter is 0', () => {
  const {handleChange, mockedCounter} = setupCounterItemTestCommon()

  render(<CounterItem
    onCountChanged={handleChange}
    key={mockedCounter.id}
    item={mockedCounter}
  />)

  userEvent.click(screen.getByRole('button', {name: /decrement/i}))

  expect(handleChange).toHaveBeenCalledTimes(0)
})

test('Handle decrement when counter is > 0 ', () => {
  const {handleChange, mockedCounter} = setupCounterItemTestCommon({count:1})

  render(<CounterItem
    onCountChanged={handleChange}
    key={mockedCounter.id}
    item={mockedCounter}
  />)

  userEvent.click(screen.getByRole('button', {name: /decrement/i}))
  expect(handleChange).toHaveBeenCalledTimes(1)
  expect(handleChange).toHaveBeenCalledWith( mockedCounter.id, -1)
})

test('Handle toggle selected', () => {
  const {toggleSelected, mockedCounter} = setupCounterItemTestCommon()

  const {container} = render(<CounterItem
    onToggleSelected={toggleSelected}
    key={mockedCounter.id}
    item={mockedCounter}
  />)

  userEvent.click(container.firstChild)
  const clickableElements = container.firstChild.querySelectorAll('.js-can-select')
  clickableElements.forEach(ce => {
    userEvent.click(ce)
  })


  expect(toggleSelected).toHaveBeenCalledTimes(clickableElements.length + 1)
  expect(toggleSelected).toHaveBeenCalledWith( mockedCounter.id )
})
