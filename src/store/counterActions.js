

const CounterActions = (dispatch, service) => {

  const counterActionError = (data) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        dispatch({type: 'ERROR', payload: true})
        reject(data)
      }, 1000)
    })
  }

  return {
    filteredList (data) {
      dispatch({type: 'FILTERED_LIST', payload: data})
    },
    list() {
      dispatch({type: 'LOADING_START'})
      return service.list()
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
      return service.remove(id)
        .then(() => {
          return new Promise(resolve => {
            setTimeout(() => {
              dispatch({type: 'REMOVE', payload: id})
              resolve()
            }, 1000)
          })
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
