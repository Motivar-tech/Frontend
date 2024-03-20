import './App.css';
import './assets/css/main.css';

import AppHome from './pages/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AppComing from './pages/Coming-soon';

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
        </Switch>
      </div>
    </Router>
    

  );
}

export default App;
