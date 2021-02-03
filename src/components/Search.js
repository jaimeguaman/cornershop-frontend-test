import { useCallback } from 'react'

function Search ({ onChange = () => {} }) {
  const handleChange = useCallback( event => {
    onChange(event.target.value)
  }, []);

  const handleCancel = useCallback( () => {
    onChange('')
  })

  return (
    <form onSubmit={e => e.preventDefault()}>
      <div>
        <input onChange={handleChange} type="text"/>
        <button onClick={handleCancel} type="reset">Cancel</button>
      </div>
    </form>
  )
}

export default Search
