import { useCallback, useState } from 'react'
import 'styles/ui/Search.scss'

function Search ({ onChange = () => {}, text}) {
  const [ isActive, setActive ] = useState(false)

  const handleChange = useCallback( event => {
    onChange(event.target.value)
  }, []);

  const handleCancel = useCallback( () => {
    onChange('')
  }, [])

  return (
    <form className={`search-box ${isActive ? "-active" : "-inactive"}`} onSubmit={e => e.preventDefault()}>
      <div className="search-box__inner">
        <input onFocus={e => setActive(true)} onBlur={e => setActive(false)} placeholder="Search Counters" onChange={handleChange} value={text} type="text"/>
        <button className="standard-button" onClick={handleCancel} type="reset">Cancel</button>
      </div>
    </form>
  )
}

export default Search
