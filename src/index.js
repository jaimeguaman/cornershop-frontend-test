
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import Landing from 'pages/Landing'
import CountersHome from 'pages/CountersHome'
import CountersCreate from 'pages/CountersCreate'
import { CounterProvider } from 'context/counter'
import 'styles/app.scss'

const App = () => {
  return (
      <Router>
          <Switch>
            <Route path="/counters/">
              <CounterProvider>
                <CountersHome />
                <Switch>
                  <Route path="/counters/add/">
                    <CountersCreate/>
                  </Route>
                </Switch>
              </CounterProvider>
            </Route>
            <Route path="/">
              <Landing />
            </Route>
          </Switch>
      </Router>
  );
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
