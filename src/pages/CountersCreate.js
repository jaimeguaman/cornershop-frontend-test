
import React, { useContext, useRef, useState, useCallback } from 'react'
import { useHistory } from "react-router-dom";
import Modal from 'components/Modal'
import { CounterActions } from 'context/counter'

const saveCounter = ( title, addFn ) => {
  if (!title) {
    return false
  }

  if (typeof addFn !== 'function') {
    return false
  }

  return addFn(title)
    .then(() => {}, (e) => { console.error('Oh boy, save not ok') })
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
    <button disabled={!state.canSave} className="accent-button" onClick={handleSaveClick}>Save</button>
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

  return (
    <form
      key="create-form"
      className="standard-form"
      onSubmit={handleFormSubmit}>
      <div className="form-control">
        <label htmlFor="new-counter-title-input">Name</label>
        <input
          onKeyDown={handleInputChange}
          maxLength="50"
          placeholder="Cups of coffee"
          id="new-counter-title-input"
          ref={state.titleRef}
          type="text"
        />
        <p className="feedback-text">
          Give it a name. Creative block? See <a href="">Examples.</a>
        </p>
      </div>
    </form>
  )
}

function CountersCreate () {
  const [canSave, setCanSave] = useState(false)
  const actions = useContext(CounterActions)
  const titleRef = useRef()
  const history = useHistory()

  const stateForModalBody = {setCanSave, titleRef, saveCounter, actions}
  const stateForModalHeader = {canSave, titleRef, saveCounter, actions}

  const handleModalClosed = () => {
    history.push('/counters/')
  }

  return (
    <Modal
      title="Create counter"
      onModalClose={ handleModalClosed }
      body={<ModalBody state={stateForModalBody} />}
      header={<ModalHeader state={stateForModalHeader} />}
    />
  )
}

export default CountersCreate
