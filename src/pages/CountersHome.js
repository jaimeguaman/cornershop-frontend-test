
import { useEffect, useContext } from 'react'
import { Switch, Route, useRouteMatch, Link } from "react-router-dom";
import CounterState, { CounterActions } from 'context/counter'
import CountersCreate from 'pages/CountersCreate'
import CounterList from 'components/CounterList'
import FooterActions from 'components/FooterActions'
import Loading from 'components/Loading'
import Search from 'components/Search'
import { ReactComponent as PlusIcon } from 'assets/plus-icon.svg'

import 'styles/pages/CountersHome.scss'

function CountersHome () {
  const actions = useContext(CounterActions)
  const state = useContext(CounterState)
  const { path } = useRouteMatch();

  //component state
  const createCounterRoutePath = `${path}add/`
  const loading = state.loading && !state.error
  const hasCounters = state.counters?.length && !state.error && !state.loading
  const hasFilteredCounters = state.filteredCounters?.length && !state.error && !state.loading
  const error = state.error && !state.loading
  const noCounters = !hasCounters && !state.loading && !error

  const getCounters = () => {
    actions.list()
  }

  const filterCounters = (text) => {
    actions.filteredList(
      state.counters.filter(counter => !text ? true : counter.title.toLowerCase().includes(text.toLowerCase()))
    )
  }

  const setFilterText = (text) => {
    actions.search(text)
  }

  const CountersEmpty = () => {
    return (
      <div className="feedback-block">
        <h2 className="large-title">No counters yet</h2>
        <p className="secondary-text">
        <q>
          When I started counting my blessings, my whole life turned around.”
          <br/>
          —Willie Nelson
        </q>
        </p>
      </div>
    )
  }

  const CountersNoResults = () => {
    return (
      <div className="feedback-block">
        <h2>No results</h2>
      </div>
    )
  }

  const CountersError = () => {
    const message = navigator.onLine ? 'An error happened while requesting counters' : 'Internet connection appears to be offline'
    return (
      <div className="feedback-block">
        <h2 className="large-title">Couldn't load the counters</h2>
        <p className="secondary-text">{message}</p>
        <button disabled={loading} onClick={getCounters}>Retry</button>
      </div>
    )
  }

  useEffect(() => {
    getCounters()
  }, [])

  useEffect(() => {
    filterCounters(state.searchText)
  }, [state.counters, state.searchText])

  return (
    <div className="counters-home-page-wrapper">
      <section className="counters-home-page">
        <div className="viewport-wrapper -full-height">
          <div className="counters-home-page__inner">
            <div className="search-container">
              <Search onChange={setFilterText} text={state.searchText}/>
            </div>
            <div className={`list-container ${noCounters ? '-auto-align' : ''}`}>
              { loading && <Loading/> }
              { hasCounters ? <CounterList counters={state.filteredCounters}/> : null }
              { noCounters ? <CountersEmpty/> : null }
              { !hasFilteredCounters &&   hasCounters ? <CountersNoResults/> : null }
              { error && <CountersError/>}
            </div>
          </div>
        </div>
      </section>
      <FooterActions>
        <div className="to-right">
          <Link className="accent-button create-counter-button" to={createCounterRoutePath}>
            <PlusIcon/>
          </Link>
        </div>
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
