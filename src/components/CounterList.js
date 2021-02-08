import { useContext, useCallback, useEffect, useState } from 'react'
import { CounterActions } from 'context/counter'
import CounterItem from 'components/CounterItem'
import MessageBox from 'components/MessageBox'
import { getCounter } from 'utils'
import { ReactComponent as RefreshIcon } from 'assets/refresh-icon.svg'

import 'styles/ui/CounterList.scss'

function CounterList ({counters, isRefreshing, refreshTimes, onRefresh = () => {} }) {
  const actions = useContext(CounterActions)
  const [selectedCounters, setSelectedCounters] = useState(0)
  const [lastErrorCountPayload, setLastErrorCountPayload] = useState({})
  const [isRetrying, setRetrying] = useState(false)

  const countChanged = (id, value) => {
    let action
    switch (value) {
      case 1:
        action = actions.increment(id)
        break
      case -1:
        action = actions.decrement(id)
        break
    }
    if (action) {
      action.then(() => {
          setLastErrorCountPayload({})
        })
        .catch(() => {
          const counter = getCounter(counters, id)
          setLastErrorCountPayload({id, value, counter})
        })
    }
    return action
  }

  const selectedChanged = (id) => {
    const counter = getCounter(counters, id)
    if (counter) {
      actions.toggleSelect(counter.id)
    }
  }

  const handleRefreshButton = useCallback( () => {
    typeof onRefresh === 'function' && onRefresh()
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

  const CounterChangedError = () => {
    const errorMessage = navigator.onLine ? 'An error happened while creating the counter' : 'Internet connection appears to be offline'

    const handleRetryClick = () => {
      setRetrying(true)
      countChanged(lastErrorCountPayload.id, lastErrorCountPayload.value)
        .then(() => {setRetrying(false)})
        .catch(() => {setRetrying(false)})
    }
    const handleDismiss = () => {
      setLastErrorCountPayload({})
      handleRefreshButton()
    }

    return (
      <MessageBox width="310px">
        <div className="remove-counter-error-block">
          <h2 className="large-title">{`Couldn’t update “${lastErrorCountPayload.counter.title}”  to ${lastErrorCountPayload.counter.count + lastErrorCountPayload.value}`}</h2>
          <p className="secondary-text">{errorMessage}</p>
          <div className="message-box-controls">
            <button
              disabled={isRetrying}
              onClick={handleRetryClick}
              className="accent-button"
              aria-labelledby="retry"
              role="button">
                Retry
              </button>
            <button
              disabled={isRetrying}
              onClick={handleDismiss}
              className="accent-secondary-button"
              aria-labelledby="dismiss"
              role="button">
                Dismiss
              </button>
          </div>
        </div>
      </MessageBox>
    )
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
      { lastErrorCountPayload.id ? <CounterChangedError></CounterChangedError> : null }
    </div>
  );
}

export default CounterList
