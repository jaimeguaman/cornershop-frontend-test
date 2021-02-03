import { useContext, useCallback, useEffect, useState } from 'react'
import CounterState, { CounterActions } from 'context/counter'
import CounterItem from 'components/CounterItem'
import { getCounter } from 'utils'

function CounterList ({counters}) {
  const actions = useContext(CounterActions)
  const state = useContext(CounterState)
  const [selectedCounters, setSelectedCounters] = useState(0)

  const countChanged = (id, value) => {
    switch (value) {
      case 1:
        actions.increment(id)
        break
      case -1:
        actions.decrement(id)
        break
    }
  }

  const selectedChanged = (id, value) => {
    const counter = getCounter(counters, id)
    if (counter) {
      actions.toggleSelect(counter.id)
    }
  }

  const handleRefreshButton = useCallback( () => {
    actions.search('')
    actions.list()
  }, [])

  const HelperSelected = () => {
    return (
      <div>
        <strong>{selectedCounters} Selected</strong>
        <button onClick={handleRefreshButton}>Refresh</button>
      </div>
    )
  }

  const HelperRefresh = () => {
    return (
      <div>
        <strong>{state.filteredCounters.length} Items</strong>
        <span>{state.refreshTimes} Times</span>
        <button onClick={handleRefreshButton}>Refresh</button>
      </div>
    )
  }

  const HelperRefreshing = () => {
    return (
      <div>
        <strong>{state.filteredCounters.length} Items</strong>
        <span>Refreshing...</span>
      </div>
    )
  }

  const ListHelper = () => {
    if (state.loading) {
      return (<HelperRefreshing />)
    }
    if (selectedCounters) {
      return (<HelperSelected/>)
    } else {
      return (<HelperRefresh/>)
    }
  }

  useEffect(() => {
    let selected = 0
    counters.map(counter => {
      if (counter.selected) {
        selected++
      }
    })
    setSelectedCounters(selected)
  }, [counters])

  return (
    <div>
      <div>
        <ListHelper />
      </div>
      <ul>
        {counters.map((counter) => (
          <CounterItem onCountChanged={countChanged} onToggleSelected={selectedChanged} key={counter.id} item={counter} />
        ))}
      </ul>
    </div>
  );
}

export default CounterList
