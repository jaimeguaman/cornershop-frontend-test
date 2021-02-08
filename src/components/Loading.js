
import { ReactComponent as LoadingIcon } from 'assets/loading-icon.svg'
import 'styles/ui/Loading.scss'

function Loading () {
  return (
    <div className="loading-indicator" role="presentation">
      <LoadingIcon />
    </div>
  )
}
export default Loading
