
import { useEffect, useContext, useState } from 'react'
import { Switch, Route, useRouteMatch, Link } from "react-router-dom";
import CounterState, { CounterActions } from 'context/counter'
import CountersCreate from 'pages/CountersCreate'
import CounterList from 'components/CounterList'
import FooterActions from 'components/FooterActions'
import Loading from 'components/Loading'
import Search from 'components/Search'

function CountersHome () {
  console.log('COUNTER HOME RENDER')
  const actions = useContext(CounterActions)
  const state = useContext(CounterState)
  const { path } = useRouteMatch();
  const createCounterRoutePath = `${path}add/`
  const [filterText, setFiltertext] = useState('')
  const loading = state.loading && !state.error
  const hasCounters = state.counters?.length && !state.error && !state.loading
  const hasFilteredCounters = state.filteredCounters?.length && !state.error && !state.loading
  const error = state.error && !state.loading
  const noCounters = !hasCounters && !state.loading && !error

  const getCounters = () => {
    actions.list()
  }

  const filterCounters = (token) => {
    actions.filteredList(
      state.counters.filter(counter => !token ? true : counter.title.includes(token))
    )
  }

  const CountersEmpty = () => {
    return (
      <div>
        <h2>No counters yet</h2>
        <p>Some random quote</p>
      </div>
    )
  }

  const CountersNoResults = () => {
    return (
      <div>
        <h2>No results</h2>
      </div>
    )
  }

  const CountersError = () => {
    const message = navigator.onLine ? 'An error happened while requesting counters' : 'Internet connection appears to be offline'
    return (
      <div>
        <h2>Couldn't load the counters</h2>
        <p>{message}</p>
        <button disabled={loading} onClick={getCounters}>Retry</button>
      </div>
    )
  }

  useEffect(() => {
    getCounters()
  }, [])

  useEffect(() => {
    filterCounters(filterText)
  }, [state.counters, filterText])

  return (
    <div>
      <section>
        <div>
          <Search onChange={setFiltertext} />
        </div>
        <div className="list-container">
          { loading && <Loading/> }
          { hasCounters ? <CounterList counters={state.filteredCounters}/> : null }
          { noCounters ? <CountersEmpty/> : null }
          { !hasFilteredCounters &&   hasCounters ? <CountersNoResults/> : null }
          { error && <CountersError/>}
        </div>
      </section>
      <FooterActions>
        <Link to={createCounterRoutePath}>+</Link>
      </FooterActions>
      <Switch>
        <Route path={createCounterRoutePath}>
          <CountersCreate/>
        </Route>
      </Switch>
    </div>
  )
}

export default CountersHome
