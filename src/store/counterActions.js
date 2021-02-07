

const CounterActions = (dispatch, service) => {

  const counterActionError = (data) => {
    dispatch({type: 'ERROR', payload: true})
    return Promise.reject()
  }

  return {
    filteredList (data) {
      dispatch({type: 'FILTERED_LIST', payload: data})
    },
    list() {
      dispatch({type: 'LOADING_START'})
      return service.list()
        .then((data) => {
          dispatch({type: 'LIST', payload: data})
        })
      .catch(counterActionError)
    },
    increment(id) {
      dispatch({type: 'INCREMENT', payload: id})
      return service.increment(id)
        .then(() => { }, () => {
          dispatch({type: 'DECREMENT', payload: id}) // RESTORE WHEN FAILS
        })
      .catch(counterActionError)
    },
    decrement(id) {
      dispatch({type: 'DECREMENT', payload: id})
      return service.decrement(id)
        .then(() => {}, () => {
          dispatch({type: 'INCREMENT', payload: id}) // RESTORE WHEN FAILS
        })
    },
    add (title) {
      dispatch({type: 'LOADING_START'})
      return service.add(title)
        .then((counter) => {
          dispatch({type: 'ADD', payload: counter})
        })
      .catch(counterActionError)
    },
    remove (id) {
      dispatch({type: 'LOADING_START'})
      return service.remove(id)
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
}

export default CounterActions
