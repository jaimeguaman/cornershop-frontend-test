import 'styles/ui/FooterActions.scss'

function FooterActions (props) {
  return (
    <footer className="footer-actions">
      <div className="viewport-wrapper">
        <div className="footer-actions__inner">
          {props.children}
        </div>
      </div>
    </footer>
  )
}

export default FooterActions
