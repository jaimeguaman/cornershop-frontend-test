import { useCallback, useState } from 'react'
import 'styles/ui/Search.scss'
import { ReactComponent as SearchIcon } from 'assets/search-icon.svg'

function Search ({ onChange = () => {}, text}) {
  const [ isActive, setActive ] = useState(false)

  const handleChange = useCallback( event => {
    onChange(event.target.value)
  }, []);

  const handleCancel = useCallback( () => {
    setActive(false)
    onChange('')
  }, [])

  return (
    <form
      className={`search-box ${isActive ? "-active" : "-inactive"}`}
      onSubmit={e => e.preventDefault()} >
      <div className="search-box__inner">
        <i class="input-icon">
          <SearchIcon />
        </i>
        <input
          onFocus={e => setActive(true)}
          onBlur={handleCancel}
          placeholder="Search Counters"
          onChange={handleChange}
          value={text}
          type="text" />
        <button className="standard-button" onClick={handleCancel} type="reset">Cancel</button>
      </div>
    </form>
  )
}

export default Search
