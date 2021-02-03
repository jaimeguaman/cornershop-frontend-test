function Modal (props) {
  return (
    <section>
      <div>
        <h2>{props.title}</h2>
        <div>
          {props.header}
        </div>
      </div>
      <div>
        {props.body}
      </div>
    </section>
  )
}

export default Modal
