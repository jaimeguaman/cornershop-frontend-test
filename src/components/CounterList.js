import React, { useContext } from 'react'
import CounterState, { CounterActions } from 'context/counter'
import CounterItem from 'components/CounterItem'

function CounterList () {
  console.log('counter list')
  const state = useContext(CounterState)
  const actions = useContext(CounterActions)

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
  return (
    <ul>
      {state.counters.map((counter) => (
        <CounterItem onCountChanged={countChanged} key={counter.id} item={counter} />
      ))}
    </ul>
  );
}

export default CounterList
