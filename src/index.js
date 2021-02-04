
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import Landing from 'pages/Landing'
import CountersHome from 'pages/CountersHome'
import { CounterProvider } from 'context/counter'
import 'styles/app.scss'

const App = () => {
  return (
    <CounterProvider>
      <Router>
          <Switch>
            <Route path="/counters/">
              <CountersHome />
            </Route>
            <Route path="/">
              <Landing />
            </Route>
          </Switch>
      </Router>
    </CounterProvider>
  );
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
