
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import Home from 'pages/Home'
import Counters from 'pages/Counters'

const App = () => {
  return (
    <Router>
        <Switch>
          <Route path="/counters">
            <Counters />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
    </Router>
  );
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
