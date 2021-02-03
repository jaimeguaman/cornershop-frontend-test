const counterReducer = (state, action) => {
  switch (action.type) {
    case 'LOADING_START':
      return {...state, loading: true}
    case 'LOADING_END':
      return {...state, loading: false}
    case 'ERROR':
      return {...state, error: action.payload}
    case 'LIST': {
      return {...state, counters: action.payload?.map(counter => {
        counter.selected = false
        return counter
      })}
    }
    case 'FILTERED_LIST': {
      return {...state, filteredCounters: action.payload?.map(counter => {
        // counter.selected = false
        return counter
      })}
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
      return {...state, counters: [...state.counters, {...action.payload, selected: false}]}
    }
    case 'REFRESH_TIMES': {
      return {...state, refreshTimes: state.refreshTimes + 1}
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
