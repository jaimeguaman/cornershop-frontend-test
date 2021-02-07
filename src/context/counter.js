import React, { createContext, useReducer} from 'react'
import CounterService from 'api/counter'
import counterReducer from 'store/counterReducer'
import counterActions from 'store/counterActions'

import initialState from 'store/initialState'

const CounterState = createContext()
const CounterActions = createContext()

function CounterProvider ({children}) {
  const [state, dispatch] = useReducer(counterReducer, initialState)
  const actions = counterActions(dispatch, CounterService)

  return (
    <CounterState.Provider value={state}>
      <CounterActions.Provider value={actions}>
        {children}
      </CounterActions.Provider>
    </CounterState.Provider>
  )
}

export default CounterState
export { CounterProvider, CounterActions }
