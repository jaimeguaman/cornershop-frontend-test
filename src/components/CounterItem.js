import { useState, useEffect, useCallback } from 'react'
import { ReactComponent as PlusIcon } from 'assets/plus-icon.svg'
import { ReactComponent as MinusIcon } from 'assets/minus-icon.svg'

import 'styles/ui/CounterItem.scss'

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
    if(typeof e.target.className?.indexOf === 'function') {
      if (e.target.className.indexOf('js-can-select') !== -1) {
        typeof onToggleSelected === 'function' && onToggleSelected(item.id)
      }
    }
  }, [])

  return (
    <li onClick={toggleSelected} className={`js-can-select counter-item ${item.selected ? '-selected' : '' }`}>
      <p className="counter-title js-can-select">{item.title}</p>
      <div className="counter-controls">
        <button
          className="decrease-button"
          disabled={isDecrementDisabled}
          onClick={(e) => handleChange(e, -1)}>
          <MinusIcon />
        </button>
        <p className={`${isDecrementDisabled ? '-disabled' : '' }`}>{item.count}</p>
        <button
          className="increase-button"
          onClick={(e) => handleChange(e, 1)}>
            <PlusIcon />
        </button>
      </div>
    </li>
  )
}
export default CounterItem
