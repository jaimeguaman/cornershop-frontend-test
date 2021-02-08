import { useHistory } from "react-router-dom";
import { ReactComponent as Logo } from 'assets/splash-icon.svg'
import 'styles/pages/Landing.scss'

function Landing () {
  const history = useHistory()
  return (
    <section className="landing-page">
      <div className="viewport-wrapper -full-height">
        <div className="landing-page__inner">
          <Logo/>
          <h2 className="large-title">Welcome to Counters</h2>
          <p className="secondary-text">Capture cups of lattes, frapuccinos, or anything else that can be counted</p>
          <button className="accent-button cta" onClick={() => history.push('/counters/')}> Get started</button>
        </div>
      </div>
    </section>
  )
}
export default Landing
