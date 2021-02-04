import 'styles/ui/Modal.scss'
import { ReactComponent as CrossIcon } from 'assets/cross-icon.svg'

function Modal (props) {
  const handleClose = () => {
    typeof props.onModalClose === 'function' && props.onModalClose()
  }
  return (
    <section className="app-modal">
      <div className="mask">
        <div className="modal-wrapper">
          <div className="viewport-wrapper -flat -full-height">
            <div className="modal-container">
                <div className="modal-header">
                  <button onClick={ handleClose } className="close-modal-button">
                    <CrossIcon/>
                  </button>
                  <h2 className="large-title -to-left">{props.title}</h2>
                  <div className="header-actions">
                    {props.header}
                  </div>
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
