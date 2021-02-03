import { useState, useEffect } from 'react'

function CounterItem ({item = {}, onCountChanged = () => {} }) {
  const [isDecrementDisabled, setDecrementDisable] = useState(item.count < 1 ? true : false)

  useEffect(() => {
    setDecrementDisable(item.count < 1 ? true : false)
  }, [item])

  const handleChange = (e, value) => {
    onCountChanged(item.id, value)
    e.preventDefault()
  }
  return (
    <li>
      <p>{item.title}</p>
      <button disabled={isDecrementDisabled} onClick={(e) => handleChange(e, -1)}>-</button>
      <p>{item.count}</p>
      <button onClick={(e) => handleChange(e, 1)}>+</button>
    </li>
  )
}
export default CounterItem
