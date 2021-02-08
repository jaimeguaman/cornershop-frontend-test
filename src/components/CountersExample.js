
import { useContext, useEffect } from 'react'
import Modal from 'components/Modal'
import CounterState, { CounterActions } from 'context/counter'
import Loading from 'components/Loading'
import 'styles/ui/CountersExample.scss'

const ModalBody = ({onHandleSelected = () => {} }) => {
  const state = useContext(CounterState)
  const actions = useContext(CounterActions)
  const hasExamples = state.examples.length > 0 && !state.loading

  const handleSelected = (title) => {
    typeof onHandleSelected === 'function' && onHandleSelected(title)
  }

  useEffect(() => {
    actions.examples()
  }, [])
  return (
    <div>
      <p className="secondary-text -to-left heading-title">Select an example to add it to your counters.</p>
      {state.loading ? <div className="loader-container"><Loading /></div> : null}
      {hasExamples ? state.examples.map((example, i) => {
        return (
          <div className="example-category" key={`cat_${i}`}>
            <p>{example.category}</p>
            <ul className="example-items">
              {example.items.map((item, j) => {
                return (
                  <li className="example-item" key={`item_${i}_${j}`}>
                    <button role="button" className="example-button" onClick={() => handleSelected(item)}>{item}</button>
                  </li>
                )
              })}
            </ul>
          </div>
        )
      }) : null}
    </div>
  )
}

function CountersExample ({ onClose, onSelected }) {

  const handleModalClosed = () => {
    typeof onClose == 'function' && onClose()
  }

  const selectExample = (title) => {
    typeof onSelected == 'function' && onSelected(title)
  }

  return (
    <section className="counters-example">
      <Modal
      title="Examples"
      onModalClose={ handleModalClosed }
      body={<ModalBody onHandleSelected={selectExample}/>}
      />
    </section>
  )
}

export default CountersExample
