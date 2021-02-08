import '@testing-library/jest-dom/extend-expect'
import {render, screen} from '@testing-library/react'
import {mockedCounterService} from 'utils/testUtils'
import counterActions from 'store/counterActions'
import counterReducer from 'store/counterReducer'
import initialState from 'store/initialState'
import CounterState, { CounterActions } from 'context/counter'

import CountersExample from 'components/CountersExample'

function counterRemoveHelper (state, onSelected = () => {}, onClose = () => {}) {
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
            <CountersExample
              onSelected={onSelected}
              onClose={onClose}
            />
          </CounterActions.Provider>
        </CounterState.Provider>
      )
    }
  }
}

test('Render counters examples correctly', () => {
  const onClosed = jest.fn()
  const onSelected = jest.fn()
  const { getComponent, counters, onStateChange } = counterRemoveHelper({}, onSelected, onClosed)
  render(getComponent())
})



