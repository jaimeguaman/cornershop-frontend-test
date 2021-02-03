
import { useContext, useRef } from 'react'
import { useHistory } from "react-router-dom";
import Modal from 'components/Modal'
import { CounterActions } from 'context/counter'


function CountersCreate () {
  const actions = useContext(CounterActions)
  const titleRef = useRef()
  const history = useHistory()

  function ModalBody () {
    return (
      <form>
        <label>Name
          <input ref={titleRef} type="text"></input>
        </label>
      </form>
    )
  }

  function ModalHeader () {
    const saveCounter = () => {
      const title = titleRef.current.value
      if (!title) {
        return false
      }
      actions.add(title)
        .then(() => {
          actions.search('')
          history.push('/counters/')
          console.log('Saved ok')
        })
        .catch(() => {
          console.error('Oh boy, save not ok')
        })

      return false
    }
    return (
      <button onClick={saveCounter}>Save</button>
    )
  }

  return (
    <Modal title="Create counter" body={<ModalBody/>} header={<ModalHeader/>} />
  )
}

export default CountersCreate
