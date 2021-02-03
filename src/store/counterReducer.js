const counterReducer = (state, action) => {
  switch (action.type) {
    case 'LOADING_START':
      return {...state, loading: true}
    case 'LOADING_END':
      return {...state, loading: false}
    case 'ERROR':
      return {...state, error: action.payload}
    case 'LIST': {
      return {...state, counters: action.payload}
    }
    case 'FILTERED_LIST': {
      return {...state, filteredCounters: action.payload}
    }
    case 'INCREMENT': {
      return {...state, counters: state.counters?.map(c => {
        return c.id === action.payload ? {...c, count: c.count + 1} : c
      })}
    }
    case 'DECREMENT': {
      return {...state, counters: state.counters?.map(c => {
        return c.id === action.payload ? {...c, count: c.count - 1} : c
      })}
    }
    case 'REMOVE': {
      return {...state, counters: state.counters?.filter(c => {c.id !== action.payload})}
    }
    case 'ADD': {
      return {...state, counters: [...state.counters, action.payload]}
    }
  }
}

export default counterReducer
