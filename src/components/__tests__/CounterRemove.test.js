import '@testing-library/jest-dom/extend-expect'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {mockedCounters, mockedCounterService} from 'utils/testUtils'
import counterActions from 'store/counterActions'
import counterReducer from 'store/counterReducer'
import initialState from 'store/initialState'
import CounterState, { CounterActions } from 'context/counter'
import CounterRemove from 'components/CounterRemove'

function counterRemoveHelper (state, onRemoved = () => {}, onError = () => {}) {
  let mockedState = state ? { ...initialState, loading:false, error: false, ...state } : { ...initialState, loading:false, error: false }
  let statechangedCallback = () => {}

  const onStateChanged = (cb) => {
    statechangedCallback = cb
  }

  const actions = counterActions((action) => {
    mockedState = counterReducer(mockedState, action)
    statechangedCallback(mockedState)
  }, mockedCounterService())

  const selectedCounters = mockedCounters.map(counter => {
    counter.selected = true
    return counter
  })


  return {
    counters: selectedCounters,
    onStateChanged,
    getComponent: () => {
      return (
        <CounterState.Provider value={mockedState}>
          <CounterActions.Provider value={actions}>
            <CounterRemove
              counters={selectedCounters}
              onRemoved={onRemoved}
              onError={onError}
            />
          </CounterActions.Provider>
        </CounterState.Provider>
      )
    }
  }
}

test('Given counters, get first counter selected and show a confirmation box before remove it', () => {
  const onRemoved = jest.fn()
  const onError = jest.fn()
  const { getComponent, counters, onStateChange } = counterRemoveHelper({}, onRemoved, onError)
  const selectedCounter = counters.filter(c => c.selected)[0]

  render(getComponent())
  expect(screen.getByText(`Delete the “${selectedCounter?.title}” counter?`))
})

test('Given a state of error, show alternative retry form instead', () => {
  const onRemoved = jest.fn()
  const onError = jest.fn()
  const { getComponent, counters} = counterRemoveHelper({error: true}, onRemoved, onError)
  const selectedCounter = counters.filter(c => c.selected)[0]
  render(getComponent())
  expect(screen.getByText(`Couldn’t delete “${selectedCounter?.title}”`))
})

describe('Test buttons states', () => {
  test('When clicking Confirm if remove starts the buttons must be disabled', () => {
    const onRemoved = jest.fn()
    const onError = jest.fn()
    const { getComponent, onStateChanged } = counterRemoveHelper({}, onRemoved, onError)

    render(getComponent())

    /* a little bizarre, maybe I ended up testing implementation details.
    maybe correct testing of this was just instantiating the component with
    state.loading = true I've already overthinking this and wanted to push limits of testint sanity/goodness
    */
    onStateChanged((state) => {
      if (state.loading) {
        setTimeout(() => {
          expect(screen.getByRole('button', {name: /delete/i})).toBeDisabled()
        }, 100)
      }
    })

    userEvent.click(screen.getByRole('button', {name: /delete/i}))
  })

  test('When it is in loading state buttons should be disabled', () => {
    /* way more clean test checking the same state as bizarre behavior test above */
    const onRemoved = jest.fn()
    const onError = jest.fn()
    const { getComponent } = counterRemoveHelper({loading: true}, onRemoved, onError)
    render(getComponent())
    expect(screen.getByRole('button', {name: /delete/i})).toBeDisabled()
  })

  test('When it is in loading state and alternative retry form, buttons should be disabled', () => {
    /* way more clean test checking the same state as bizarre behavior test above */
    const onRemoved = jest.fn()
    const onError = jest.fn()
    const { getComponent } = counterRemoveHelper({loading: true, error: true}, onRemoved, onError)
    render(getComponent())
    expect(screen.getByRole('button', {name: /retry/i})).toBeDisabled()
  })
})






