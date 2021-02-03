function FooterActions (props) {
  return (
    <footer className="footer-actions">
      <p>Este es el footer</p>
      <div className="inner">
        {props.children}
      </div>
    </footer>
  )
}

export default FooterActions
