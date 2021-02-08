import '@testing-library/jest-dom/extend-expect'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {mockedCounterService} from 'utils/testUtils'
import counterActions from 'store/counterActions'
import counterReducer from 'store/counterReducer'
import initialState from 'store/initialState'
import CounterState, { CounterActions } from 'context/counter'
import CountersCreate from 'pages/CountersCreate'

function countersCreateHelper (state) {
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
            <CountersCreate/>
          </CounterActions.Provider>
        </CounterState.Provider>
      )
    }
  }
}

test('Renders without crashing', () => {
  const { getComponent } = countersCreateHelper({})
  render(getComponent())
  expect(screen.getByLabelText('Name')).toBeInTheDocument()
  expect(screen.getByRole('button', {name: /save/i})).toBeInTheDocument()
})

test('Given a state of error, show alternative retry form instead', () => {
  const { getComponent } = countersCreateHelper({error: true})
  render(getComponent())
  expect(screen.getByText('Couldn’t create counter'))
})








