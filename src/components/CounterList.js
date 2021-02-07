import { useContext, useCallback, useEffect, useState } from 'react'
import { CounterActions } from 'context/counter'
import CounterItem from 'components/CounterItem'
import { getCounter } from 'utils'
import { ReactComponent as RefreshIcon } from 'assets/refresh-icon.svg'

import 'styles/ui/CounterList.scss'



function CounterList ({counters, isRefreshing, refreshTimes}) {
  const actions = useContext(CounterActions)
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
        <button className="refresh-button" onClick={handleRefreshButton} aria-label="refresh" role="button">
          <RefreshIcon />
        </button>
      </div>
    )
  }

  const HelperRefresh = () => {
    return (
      <div className="list-helper -refresh">
        <p className="items-count">{counters.length} Items</p>
        <p className="times-count">{refreshTimes} Times</p>
        <button className="refresh-button" onClick={handleRefreshButton} aria-label="refresh" role="button">
        <RefreshIcon />
        </button>
      </div>
    )
  }

  const HelperRefreshing = () => {
    return (
      <div className="list-helper -refreshing">
        <p className="items-count">{counters.length} Items</p>
        <p className="refreshing-indicator">
          <RefreshIcon />
          Refreshing...
        </p>
      </div>
    )
  }

  const ListHelper = () => {
    if (isRefreshing) {
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
        {counters.length > 0 ? <ListHelper /> : null}
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
