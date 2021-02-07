

import React, { useContext, useCallback, useState, useEffect } from 'react'
import CounterState, { CounterActions } from 'context/counter'
import MessageBox from 'components/MessageBox'

const removeCounter = ( counter, removeFn ) => {
  if (!counter) {
    return false
  }

  if (typeof removeFn !== 'function') {
    return false
  }

  return removeFn(counter.id)
}

const CounterRemove = ({ onRemoved, onError}) => {
  const state = useContext(CounterState)
  const actions = useContext(CounterActions)
  const [errorMessage, setErrorMessage] = useState('An error happened while trying to delete the counter')
  let counter = state.filteredCounters.filter(c => c.selected)

  if (!counter.length) {
    typeof onError=== 'function' && onError('No selected counter')
    console.error('No selected counter')
    return false
  }

  counter = counter[0]

  const handleRemoveConfirm = useCallback( (e) => {
    removeCounter(counter, actions.remove)
      .then(() => {
        typeof onRemoved === 'function' && onRemoved(true, counter)
      })
      .catch((e) => {
        if (!navigator.onLine) {
          setErrorMessage('Internet connection appears to be offline')
        }
      })
  }, [])

  const handleOnErrorCancel = useCallback( () => {
    actions.resetError()
    typeof onError === 'function' && onError()
  }, [])

  const handleCancel = useCallback( () => {
    typeof onRemoved === 'function' && onRemoved(false, counter)
  }, [])

  useEffect(() => {
    if (state.error) {
      actions.resetError()
    }
  }, [])

  return (
    <MessageBox width="400px">
      { !state.error ? <div className="remove-counter-block">
        <h2 className="large-title">{`Delete the “${counter?.title}” counter?`}</h2>
        <p className="secondary-text">This cannot be undone.</p>
        <div className="message-box-controls">
          <button disabled={state.loading} onClick={handleCancel} className="accent-button">Cancel</button>
          <button disabled={state.loading} onClick={handleRemoveConfirm} className="accent-secondary-button destructive-button">Delete</button>
        </div>
      </div> : null }
      { state.error ? <div className="remove-counter-error-block">
        <h2 className="large-title">{`Couldn’t delete “${counter?.title}”`}</h2>
        <p className="secondary-text">{errorMessage}</p>
        <div className="message-box-controls">
          <button disabled={state.loading} onClick={handleRemoveConfirm} className="accent-button">Retry</button>
          <button disabled={state.loading} onClick={handleOnErrorCancel} className="accent-secondary-button">Dismiss</button>
        </div>
      </div> : null }

    </MessageBox>
  )
}

export default CounterRemove
