import { useContext, useCallback, useEffect, useState } from 'react'
import CounterState, { CounterActions } from 'context/counter'
import CounterItem from 'components/CounterItem'
import { getCounter } from 'utils'
import { ReactComponent as RefreshIcon } from 'assets/refresh-icon.svg'

import 'styles/ui/CounterList.scss'



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

  const selectedChanged = (id) => {
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
      <div className="list-helper -selected">
        <p>{selectedCounters} Selected</p>
        <button className="refresh-button" onClick={handleRefreshButton}>
          <RefreshIcon />
        </button>
      </div>
    )
  }

  const HelperRefresh = () => {
    return (
      <div className="list-helper -refresh">
        <p className="items-count">{state.filteredCounters.length} Items</p>
        <p className="times-count">{state.refreshTimes} Times</p>
        <button className="refresh-button" onClick={handleRefreshButton}>
        <RefreshIcon />
        </button>
      </div>
    )
  }

  const HelperRefreshing = () => {
    return (
      <div className="list-helper -refreshing">
        <p className="items-count">{state.filteredCounters.length} Items</p>
        <p className="refreshing-indicator">
          <RefreshIcon />
          Refreshing...
        </p>
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
    <div className="counter-list">
      <div className="list-helper-container">
        {counters.length > 0 && <ListHelper />}
      </div>
      <ul className="counter-items">
        {counters.map((counter) => (
          <CounterItem onCountChanged={countChanged} onToggleSelected={selectedChanged} key={counter.id} item={counter} />
        ))}
      </ul>
    </div>
  );
}

export default CounterList
