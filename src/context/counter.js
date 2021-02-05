import React, { createContext, useReducer} from 'react'
import CounterService from 'api/counter'
import counterReducer from 'store/counterReducer'
import initialState from 'store/initialState'

const CounterState = createContext()
const CounterActions = createContext()

function CounterProvider ({children}) {
  const [state, dispatch] = useReducer(counterReducer, initialState)

  const counterActionError = (data) => {
    dispatch({type: 'ERROR', payload: true})
    return Promise.reject(data)
  }

  const actions = {
    filteredList (data) {
      dispatch({type: 'FILTERED_LIST', payload: data})
    },
    list() {
      dispatch({type: 'LOADING_START'})
      return CounterService.list()
        .then((data) => {
          return new Promise(resolve => {
            setTimeout(() => {
              dispatch({type: 'LIST', payload: data})
              resolve()
            }, 1000)
          })
        })
      .catch(counterActionError)
    },
    increment(id) {
      dispatch({type: 'INCREMENT', payload: id})
      return CounterService.increment(id)
        .then(() => { }, () => {
          dispatch({type: 'DECREMENT', payload: id}) // RESTORE WHEN FAILS
        })
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
      dispatch({type: 'LOADING_START'})
      return CounterService.add(title)
        .then((counter) => {
          return new Promise(resolve => {
            setTimeout(() => {
              dispatch({type: 'ADD', payload: counter})
              resolve()
            }, 100)
          })
        })
      .catch(counterActionError)
    },
    remove (id) {
      dispatch({type: 'LOADING_START'})
      return CounterService.remove(id)
        .then(() => {
          dispatch({type: 'REMOVE', payload: id})
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
