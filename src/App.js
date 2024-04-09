import './App.css';
import './assets/css/main.css';

import AppHome from './pages/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AppComing from './pages/Coming-soon';
import AppHelp from './pages/Help.js';
import AppSuccess from './pages/Success.js';
import AppAuth from './pages/User-auth.js';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <AppHome/>
          </Route>
          <Route path="/coming-soon">
            <AppComing/>
          </Route>
          <Route path="/help">
            <AppHelp/>
          </Route>
          <Route path="/success">
            <AppSuccess/>
          </Route>
          <Route path="/user-auth">
            <AppAuth/>
          </Route>
        </Switch>
      </div>
    </Router>
    

  );
}

export default App;
