
import { useState} from 'react'
import { ReactComponent as ShareIcon } from 'assets/share-icon.svg'
import { ReactComponent as NotesIcon } from 'assets/notes-icon.svg'

import 'styles/ui/CountersShare.scss'

function CountersShare ({counters}) {
  const [isSharing, setSharing] = useState(false)
  const selectedCounters = counters.filter(c => c.selected)

  const handleShareClick = (e) => {
    if(e.target.nodeName.toLowerCase().indexOf('svg') !== -1 || e.target.nodeName.toLowerCase().indexOf('button') !== -1 ) {
      setSharing(!isSharing)
      e.preventDefault()
    }
  }

  const handleCopyClick = () => {
    setSharing(false)
  }

  return (
    <button className="standard-button counters-share-button js-toggle-share" onClick={handleShareClick}>
      <span className={`counters-share ${isSharing ? '-active' : '' }`}>
        <span className="counters-share__inner">
          <span className="left">
            <span className="large-title -to-left">{`Share ${selectedCounters.length} counters`}</span>
            <span
              className="accent-secondary-button copy-button"
              aria-labelledby="copy"
              role="button"
              onClick={handleCopyClick}>
                Copy
            </span>
          </span>
          <span className="right">
            <span className="decal">
              <NotesIcon />
            </span>
            <span className="counters-to-share">
              {selectedCounters.map((counter, i) => (
                <span key={counter.id} className="counter-item-title">{`${counter.count} x ${counter.title}`}</span>
              ))}
            </span>
          </span>
        </span>
      </span>
      <ShareIcon />
    </button>
  )
}

export default CountersShare
