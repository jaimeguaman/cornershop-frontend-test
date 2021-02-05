function CountersError ({ state }) {
  const message = navigator.onLine ? 'An error happened while requesting counters' : 'Internet connection appears to be offline'
  return (
    <div className="feedback-block">
      <h2 className="large-title">Couldn't load the counters</h2>
      <p className="secondary-text">{message}</p>
      <button className="accent-secondary-button" disabled={state.loading} onClick={() => state.getCounters(true) }>Retry</button>
    </div>
  )
}

export default CountersError
