
import { useEffect, useContext, useState, useCallback } from 'react'
import { Link } from "react-router-dom";

import CounterState, { CounterActions } from 'context/counter'
import CounterList from 'components/CounterList'
import FooterActions from 'components/FooterActions'
import Loading from 'components/Loading'
import Search from 'components/Search'
import CounterRemove from 'components/CounterRemove'
import CountersError from 'components/CountersError'
import CountersEmpty from 'components/CountersEmpty'
import CountersNoResults from 'components/CountersNoResults'

import { ReactComponent as PlusIcon } from 'assets/plus-icon.svg'
import { ReactComponent as TrashIcon } from 'assets/trash-icon.svg'
import { ReactComponent as ShareIcon } from 'assets/share-icon.svg'

import 'styles/pages/CountersHome.scss'

function CountersHome () {
  const actions = useContext(CounterActions)
  const state = useContext(CounterState)
  const [shouldShowLoading, setShouldShowLoading] = useState(true)
  const [isRemoving, setRemoving] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const selectedCounters = state.counters?.filter(c => c.selected)

  //component state
  const loading = state.loading && !state.error
  const isError = state.error && !state.loading && !isRemoving
  const hasCounters = state.counters?.length && !isError && (!state.loading || !shouldShowLoading)
  const hasFilteredCounters = state.filteredCounters?.length && !isError && !state.loading
  const noCounters = !hasCounters && !state.loading && !isError
  const autoAlignLayout = (loading && shouldShowLoading) || (!hasFilteredCounters && hasCounters && !loading) || noCounters || isError
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

  const handleRefreshCounters = useCallback(() => {
    actions.search('')
    actions.list()
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
              { loading && shouldShowLoading ? <Loading/> : null}
              { hasCounters ? <CounterList
                                counters={state.filteredCounters}
                                isRefreshing={state.loading}
                                refreshTimes={state.refreshTimes}
                                onRefresh = { handleRefreshCounters } />
                            : null
              }
              { noCounters ? <CountersEmpty/> : null}
              { noResults ? <CountersNoResults/> : null }
              { isError ? <CountersError state={{loading: state.loading, getCounters}}/> : null }
            </div>
          </div>
        </div>
      </section>
      <FooterActions>
        {isRemoving && atLeastOneSelected &&
          <CounterRemove
            onRemoved={() => setRemoving(false)}
            onError={() => setRemoving(false)} />
        }
        <div className="to-left">
          {justOneSelected && <button className="standard-button" onClick={handleRemoveIntent}>
            <TrashIcon />
          </button>}
          {atLeastOneSelected && <button className="standard-button">
            <ShareIcon />
          </button>}
        </div>
        <div className="to-right">
          <Link className="accent-button create-counter-button" to="/counters/add/">
            <PlusIcon/>
          </Link>
        </div>
      </FooterActions>
    </div>
  )
}

export default CountersHome
