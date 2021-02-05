import React, { createContext, useReducer} from 'react'
import CounterService from 'api/counter'
import counterReducer from 'store/counterReducer'
import initialState from 'store/initialState'

const CounterState = createContext()
const CounterActions = createContext()

function CounterProvider ({children}) {
  const [state, dispatch] = useReducer(counterReducer, initialState)

  const counterActionError = (data) => {
    dispatch({type: 'LOADING_END'})
    dispatch({type: 'ERROR', payload: true})
    return Promise.reject(data)
  }

  const actions = {
    filteredList (data) {
      dispatch({type: 'FILTERED_LIST', payload: data})
    },
    list() {
      dispatch({type: 'ERROR', payload: false})
      dispatch({type: 'LOADING_START'})
      dispatch({type: 'REFRESH_TIMES'})
      return CounterService.list()
        .then((data) => {
          return new Promise(resolve => {
            setTimeout(() => {
              dispatch({type: 'LIST', payload: data})
              dispatch({type: 'LOADING_END'})
              resolve()
            }, 1000)
          })
        })
      .catch(counterActionError)
    },
    increment(id) {
      dispatch({type: 'ERROR', payload: false})
      dispatch({type: 'INCREMENT', payload: id})
      return CounterService.increment(id)
        .then(() => { }, () => {
          dispatch({type: 'DECREMENT', payload: id}) // RESTORE WHEN FAILS
        })
      .catch(counterActionError)
    },
    decrement(id) {
      dispatch({type: 'ERROR', payload: false})
      dispatch({type: 'DECREMENT', payload: id})
      return CounterService.decrement(id)
        .then(() => {}, () => {
          dispatch({type: 'INCREMENT', payload: id}) // RESTORE WHEN FAILS
        })
    },
    add (title) {
      dispatch({type: 'ERROR', payload: false})
      dispatch({type: 'LOADING_START'})
      return CounterService.add(title)
        .then((counter) => {
          return new Promise(resolve => {
            setTimeout(() => {
              dispatch({type: 'ADD', payload: counter})
              dispatch({type: 'LOADING_END'})
              resolve()
            }, 100)
          })
        })
      .catch(counterActionError)
    },
    remove (id) {
      dispatch({type: 'ERROR', payload: false})
      dispatch({type: 'LOADING_START'})
      return CounterService.remove(title)
        .then(() => {
          dispatch({type: 'REMOVE', payload: id})
          dispatch({type: 'LOADING_END'})
        })
      .catch(counterActionError)
    },
    toggleSelect (id) {
      dispatch({type: 'TOGGLE_SELECTED', payload: id})
    },
    search (text) {
      dispatch({type: 'SEARCH_TEXT', payload: text})
    },
    resetError () {
      dispatch({type: 'ERROR', payload: false})
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
