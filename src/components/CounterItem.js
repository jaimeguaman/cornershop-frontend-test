import { useState, useEffect, useCallback } from 'react'

function CounterItem ({item = {}, onCountChanged, onToggleSelected}) {
  const [isDecrementDisabled, setDecrementDisable] = useState(item.count < 1 ? true : false)

  useEffect(() => {
    setDecrementDisable(item.count < 1 ? true : false)
  }, [item])

  const handleChange = useCallback((e, value) => {
    typeof onCountChanged === 'function' && onCountChanged(item.id, value)
    e.preventDefault()
  }, [])

  const toggleSelected = useCallback((e) => {
    if(e.target.nodeName !== 'BUTTON') {
      typeof onToggleSelected === 'function' && onToggleSelected(item.id)
    }
  }, [])

  return (
    <li onClick={toggleSelected} style={item.selected ? {backgroundColor: 'red'} : {}}>
      <p>{item.title}</p>
      <button disabled={isDecrementDisabled} onClick={(e) => handleChange(e, -1)}>-</button>
      <p>{item.count}</p>
      <button onClick={(e) => handleChange(e, 1)}>+</button>
    </li>
  )
}
export default CounterItem
