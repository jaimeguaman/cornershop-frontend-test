
import { useEffect, useContext, useState, useCallback } from 'react'
import { Switch, Route, useRouteMatch, Link } from "react-router-dom";
import CounterState, { CounterActions } from 'context/counter'
import CountersCreate from 'pages/CountersCreate'
import CounterList from 'components/CounterList'
import FooterActions from 'components/FooterActions'
import Loading from 'components/Loading'
import Search from 'components/Search'
import CounterRemove from 'components/CounterRemove'

import { ReactComponent as PlusIcon } from 'assets/plus-icon.svg'
import { ReactComponent as TrashIcon } from 'assets/trash-icon.svg'
import { ReactComponent as ShareIcon } from 'assets/share-icon.svg'

import 'styles/pages/CountersHome.scss'


const CountersNoResults = () => {
  return (
    <div className="feedback-block">
      <h2 className="feedback-text">No results</h2>
    </div>
  )
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

const CountersError = ({ state }) => {
  const message = navigator.onLine ? 'An error happened while requesting counters' : 'Internet connection appears to be offline'
  return (
    <div className="feedback-block">
      <h2 className="large-title">Couldn't load the counters</h2>
      <p className="secondary-text">{message}</p>
      <button className="accent-secondary-button" disabled={state.loading} onClick={() => state.getCounters(true) }>Retry</button>
    </div>
  )
}

function CountersHome () {
  const actions = useContext(CounterActions)
  const state = useContext(CounterState)
  const [shouldShowLoading, setShouldShowLoading] = useState(true)
  const [isRemoving, setRemoving] = useState(false)
  const [isSearching, setIsSearching] = useState(false)

  const { path } = useRouteMatch();
  const selectedCounters = state.counters?.filter(c => c.selected)
  const createCounterRoutePath = `${path}add/`
  //component state
  const loading = state.loading && !state.error
  const hasCounters = state.counters?.length && !state.error && (!state.loading || !shouldShowLoading)
  const hasFilteredCounters = state.filteredCounters?.length && !state.error && !state.loading
  const error = state.error && !state.loading
  const noCounters = !hasCounters && !state.loading && !error
  const autoAlignLayout = (loading && shouldShowLoading) || (!hasFilteredCounters && hasCounters && !loading) || noCounters || error
  const justOneSelected = selectedCounters ? selectedCounters.length == 1 : false
  const atLeastOneSelected = selectedCounters? selectedCounters.length >= 1 : false
  const noResults = !hasFilteredCounters && hasCounters && !loading && isSearching

  const getCounters = useCallback((showLoading) => {
    setShouldShowLoading(showLoading)
    return actions.list()
            .then(() => {
              setShouldShowLoading(false)
            })
  }, [])

  const filterCounters = (text) => {
    if (text) {
      setIsSearching(true)
      actions.filteredList(
        state.counters.filter(counter => !text ? true : counter.title.toLowerCase().includes(text.toLowerCase()))
      )
    } else {
      actions.filteredList(state.counters)
    }
  }

  const setFilterText = useCallback((text) => {
    actions.search(text)
  })

  const handleRemoveIntent = useCallback(() => {
    setRemoving(true)
  })

  useEffect(() => {
    getCounters(true)
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
            <div className={`list-container ${ autoAlignLayout ? '-auto-align' : ''}`}>
              { loading && shouldShowLoading && <Loading/> }
              { hasCounters ? <CounterList counters={state.filteredCounters}/> : null }
              { noCounters ? <CountersEmpty/> : null }
              { noResults ? <CountersNoResults/> : null }
              { error && <CountersError state={state.loading, getCounters}/>}
            </div>
          </div>
        </div>
      </section>
      <FooterActions>
        {isRemoving && atLeastOneSelected && <CounterRemove onRemoved={() => setRemoving(false)} onError={() => setRemoving(false)} />}
        <div className="to-left">
          {justOneSelected && <button className="standard-button" onClick={handleRemoveIntent}>
            <TrashIcon />
          </button>}
          {atLeastOneSelected && <button className="standard-button">
            <ShareIcon />
          </button>}
        </div>
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
