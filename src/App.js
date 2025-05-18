import "./App.css";
import "./assets/css/main.css";

import AppHome from "./pages/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppComing from "./pages/Coming-soon";
import AppHelp from "./pages/Help.js";
import AppSuccess from "./pages/Success.js";
import AppAuth from "./pages/User-auth.js";
import AppFundLearner from "./pages/Fund-learner.js";
import AppHelpLearner from "./pages/Help-learner.js";
import AppDashboard from './pages/learnerDashboard.js';
import Explore from './pages/Explore';
import PrivateRoute from "./components/PrivateRoute.js";
import DashboardRouter from "./pages/DashboardRouter";


import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Router>
      <div className="App">
      <Toaster
        toastOptions={{
          style: {
            background: "white",
            color: "green",
          },
        }}
      />
        <Switch>
          <Route exact path="/">
            <AppHome />
          </Route>
          <Route path="/coming-soon">
            <AppComing />
          </Route>
          <PrivateRoute path="/help" component={AppHelp} />
          <Route path="/success">
            <AppSuccess />
          </Route>
          <Route path="/user-auth">
            <AppAuth />
          </Route>
          <Route path="/dashboard">
            <DashboardRouter />
          </Route>
          <Route path="/explore">
            <Explore />
          </Route>
          <PrivateRoute path="/fund-learner" component={AppFundLearner} />
          <PrivateRoute path="/help-learner" component={AppHelpLearner} />
        </Switch>
      </div>
    </Router>

    // <Router>
    //   <Route exact path="/" element={<AppHome/>} />
    //   <Route exact path="/coming-soon" element={<AppComing/>} />
    //   <Route exact path="/help" element={ <AppHelp/>} />
    //   <Route exact path="/success" element={    <AppSuccess/>} />
    //   <Route exact path="/user-auth" element={<AppAuth/>} />
    //   <Route exact path="/fund-learner" element={   <AppFundLearner/>} />
    //   <Route exact path="/help-learner" element={    <AppHelpLearner/>} /

    // </Router>
  );
}

export default App;
