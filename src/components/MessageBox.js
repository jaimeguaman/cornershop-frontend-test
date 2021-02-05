
// intentional naming remembering that old days of Visual Basic 6 :')

import 'styles/ui/Modal.scss'
import 'styles/ui/MessageBox.scss'

// this is actually a lighter implementation of Modal
function MessageBox ({ children, width = 'auto' }) {
  return (
    <section className="app-modal message-box">
      <div className="mask">
        <div className="modal-wrapper -spaced">
          <div className="viewport-wrapper -flat">
            <div className="modal-container -preserve-height" style={ { width: width } }>
                <div className="modal-body">
                  {children}
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MessageBox
