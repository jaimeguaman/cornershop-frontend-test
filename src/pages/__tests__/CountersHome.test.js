import '@testing-library/jest-dom/extend-expect'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {mockedCounters, mockedCounterService} from 'utils/testUtils'
import counterActions from 'store/counterActions'
import counterReducer from 'store/counterReducer'
import initialState from 'store/initialState'
import CounterState, { CounterActions } from 'context/counter'
import CountersHome from 'pages/CountersHome'

function countersHomeHelper (state) {
  let mockedState = state ? { ...initialState, loading:false, error: false, ...state } : { ...initialState, loading:false, error: false }
  let statechangedCallback = () => {}

  const onStateChanged = (cb) => {
    statechangedCallback = cb
  }

  const actions = counterActions((action) => {
    mockedState = counterReducer(mockedState, action)
    statechangedCallback(mockedState)
  }, mockedCounterService())

  return {
    onStateChanged,
    getComponent: () => {
      return (
        <CounterState.Provider value={mockedState}>
          <CounterActions.Provider value={actions}>
            <CountersHome/>
          </CounterActions.Provider>
        </CounterState.Provider>
      )
    }
  }
}

test('Renders with counters without crashing', () => {
  const { getComponent } = countersHomeHelper({
    counters: mockedCounters,
    filteredCounters: mockedCounters
  })
  render(getComponent())
})


