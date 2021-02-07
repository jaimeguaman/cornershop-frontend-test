const counterReducer = (state, action) => {
  switch (action.type) {
    case 'LOADING_START':
      return {...state, loading: true, error: false}
    case 'LOADING_END':
      return {...state, loading: false}
    case 'ERROR':
      return {...state, loading:false, error: action.payload}
    case 'LIST': {
      return {
        ...state,
        refreshTimes: state.refreshTimes + 1,
        loading: false,
        counters: action.payload?.map(counter => {
          counter.selected = false
          return counter
      })}
    }
    case 'FILTERED_LIST': {
      return {...state, filteredCounters: action.payload}
    }
    case 'INCREMENT': {
      return {...state, error: false, counters: state.counters?.map(c => {
        return c.id === action.payload ? {...c, count: c.count + 1} : c
      })}
    }
    case 'DECREMENT': {
      return {...state, error: false, counters: state.counters?.map(c => {
        return c.id === action.payload ? {...c, count: c.count - 1} : c
      })}
    }
    case 'REMOVE': {
      const result = {
        ...state,
        counters: state.counters?.filter(c => (c.id !== action.payload)),
        filteredCounters: state.counters?.filter(c => (c.id !== action.payload)),
        loading: false,
        error: false
      }
      return result
    }
    case 'ADD': {
      return {
        ...state,
        loading: false,
        error: false,
        counters: [...state.counters, { ...action.payload, selected: false }]
      }
    }
    case 'TOGGLE_SELECTED': {
      return {...state, counters: state.counters?.map(c => {
        return c.id === action.payload ? {...c, selected: !c.selected} : c
      })}
    }
    case 'SEARCH_TEXT': {
      return {...state, searchText: action.payload}
    }
  }
}

export default counterReducer
