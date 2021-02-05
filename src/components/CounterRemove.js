

import React, { useContext, useCallback, useEffect } from 'react'
import { useHistory } from "react-router-dom";
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
        typeof onRemoved === 'function' && onRemoved(counter)
      })
  }, [])

  const handleCancel = useCallback( () => {
    if (state.error) {
      typeof onError=== 'function' && onError()
      actions.resetError()
    } else {
      typeof onRemoved === 'function' && onRemoved(counter)
    }
  }, [])

  return (
    <MessageBox width="400px">
      <div className="remove-counter-block">
        <h2 className="large-title">{`Delete the “${counter?.title}” counter?`}</h2>
        <p className="secondary-text">This cannot be undone.</p>
        <div className="message-box-controls">
          <button disabled={state.loading} onClick={handleCancel} className="accent-button">Cancel</button>
          <button disabled={state.loading} onClick={handleRemoveConfirm} className="accent-secondary-button destructive-button">Delete</button>
        </div>
      </div>
    </MessageBox>
  )
}

export default CounterRemove
