
import { useEffect, useContext } from 'react'
import { Switch, Route, useRouteMatch, Link } from "react-router-dom";
import CounterState, { CounterActions } from 'context/counter'
import CountersCreate from 'pages/CountersCreate'
import CounterList from 'components/CounterList'
import FooterActions from 'components/FooterActions'
import Loading from 'components/Loading'

function CountersHome () {
  const actions = useContext(CounterActions)
  const state = useContext(CounterState)
  const { path } = useRouteMatch();
  const hasCounters = !state.loading && state.counters?.length
  const createCounterRoutePath = `${path}add/`

  useEffect(() => {
    actions.list()
  }, [])

  const NoCounters = () => {
    return (
      <div>
        <h2>No counters yet</h2>
        <p>Some random quote</p>
      </div>
    )
  }

  return (
    <div>
      <section>
        <div>Here will be search component</div>
        <div className="list-container">
          {state.loading && <Loading/>}
          {hasCounters ? <CounterList/> : <NoCounters/>}
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
