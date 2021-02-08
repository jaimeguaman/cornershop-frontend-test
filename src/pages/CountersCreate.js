
import React, { useContext, useRef, useState, useCallback, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import Modal from 'components/Modal'
import CounterState, { CounterActions } from 'context/counter'
import Loading from 'components/Loading'
import MessageBox from 'components/MessageBox'

import 'styles/pages/CountersCreate.scss'

const saveCounter = ( title, addFn ) => {
  if (!title) {
    return false
  }

  if (typeof addFn !== 'function') {
    return false
  }

  return addFn(title)
}

const ModalHeader = ({ state }) => {
  const history = useHistory()

  const handleSaveClick = useCallback( (e) => {
    state.saveCounter(state.titleRef.current.value, state.actions.add)
      .then(() => {
        state.actions.search('')
        history.push('/counters/')
      })
    e.preventDefault()
  }, [])
  return (
    <button
      disabled={!state.canSave || state.loading}
      className="accent-button"
      onClick={handleSaveClick}
      role="button"
      aria-labelledby="save">
        Save
      </button>
  )
}

const ModalBody = ({ state }) => {
  const history = useHistory()

  const handleInputChange = useCallback( () => {
    const title = state.titleRef.current.value

    if (!title) {
      return false
    }
    if (typeof state.setCanSave !== 'function') {
      return false
    }

    if (title.length > 2) {
      state.setCanSave(true)
    } else {
      state.setCanSave(false)
    }
  }, [])

  const handleFormSubmit = useCallback( (e) => {
    state.saveCounter(state.titleRef.current.value, state.actions.add)
      .then(() => {
        state.actions.search('')
        history.push('/counters/')
      })
    e.preventDefault()
  }, [])

  useEffect(() => {
    if (state.titleRef.current) {
      state.titleRef.current.focus()
    }
  }, [])

  return (
    <form
      key="create-form"
      className="standard-form"
      onSubmit={handleFormSubmit}>
      <div className={`form-control ${ state.loading ? '-inactive' : '' }`}>
        <label htmlFor="new-counter-title-input">Name</label>
        <input
          onKeyDown={handleInputChange}
          maxLength="150"
          placeholder="Cups of coffee"
          id="new-counter-title-input"
          ref={state.titleRef}
          type="text"
        />
        <p className="feedback-text">
          Give it a name. Creative block? See <a href="">Examples.</a>
        </p>
      </div>
      <div className="loading-container">
        {state.loading && <Loading />}
      </div>
    </form>
  )
}

function CountersCreate () {
  const state = useContext(CounterState)
  const [canSave, setCanSave] = useState(false)
  const actions = useContext(CounterActions)
  const titleRef = useRef()
  const history = useHistory()
  const errorMessage = navigator.onLine ? 'An error happened while creating the counter' : 'Internet connection appears to be offline'
  const stateForModalBody = {setCanSave, titleRef, saveCounter, actions, loading: state.loading}
  const stateForModalHeader = {canSave, titleRef, saveCounter, actions, loading: state.loading}

  const handleModalClosed = () => {
    if (state.error) {
      actions.resetError()
    }
    history.push('/counters/')
  }

  return (
    <section className="counters-create-page">
      <Modal
      title="Create counter"
      onModalClose={ handleModalClosed }
      body={<ModalBody state={stateForModalBody} />}
      header={<ModalHeader state={stateForModalHeader} />}
      />
      {state.error && <MessageBox width="310px">
        <div className="error-message-block">
          <h2 className="large-title">Couldn’t create counter</h2>
          <p className="secondary-text">{errorMessage}</p>
          <button onClick={handleModalClosed} className="accent-button">Dismiss</button>
        </div>
      </MessageBox>}
    </section>
  )
}

export default CountersCreate
