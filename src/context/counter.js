import React, { createContext, useReducer} from 'react'
import CounterService from 'api/counter'
import counterReducer from 'store/counterReducer'
import initialState from 'store/initialState'

const CounterState = createContext()
const CounterActions = createContext()

function CounterProvider ({children}) {
  const [state, dispatch] = useReducer(counterReducer, initialState)

  const counterActionError = (data) => {
    console.error(data)
    dispatch({type: 'LOADING_END'})
  }

  const actions = {
    list() {
      dispatch({type: 'LOADING_START'})
      return CounterService.list()
        .then((data) => {
          dispatch({type: 'LOADING_END'})
          dispatch({type: 'LIST', payload: data})
        })
      .catch(counterActionError)
    },
    increment(id) {
      dispatch({type: 'INCREMENT', payload: id})
      return CounterService.increment(id)
        .then(() => {
        }, () => {dispatch({type: 'DECREMENT', payload: id})})
      .catch(counterActionError)
    },
    decrement(id) {
      dispatch({type: 'DECREMENT', payload: id})
      return CounterService.decrement(id)
        .then(() => {}, () => {
          dispatch({type: 'INCREMENT', payload: id}) // RESTORE WHEN FAILS
        })
    },
    add (title) {
      return CounterService.add(title)
        .then((counter) => {
          dispatch({type: 'ADD', payload: counter})
        })
      .catch(counterActionError)
    },
    remove (id) {
      return CounterService.remove(title)
        .then(() => {
          dispatch({type: 'REMOVE', payload: id})
        })
      .catch(counterActionError)
    }
  }

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