import 'styles/ui/Modal.scss'

function Modal (props) {
  return (
    <section className="app-modal">
      <div className="mask">
        <div className="modal-wrapper">
          <div className="viewport-wrapper">
            <div className="modal-container">
                <div className="modal-header">
                  <h2>{props.title}</h2>
                  {props.header}
                </div>
                <div className="modal-body">
                  {props.body}
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Modal
