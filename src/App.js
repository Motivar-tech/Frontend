import "./App.css";
import "./assets/css/main.css";

import AppHome from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppComing from "./pages/Coming-soon";
import AppHelp from "./pages/Help.js";
import AppSuccess from "./pages/Success.js";
import AppAuth from "./pages/User-auth.js";
import AppFundLearner from "./pages/Fund-learner.js";
import AppHelpLearner from "./pages/Help-learner.js";
import Explore from "./pages/Explore";
import PrivateRoute from "./components/PrivateRoute.js";
import DashboardRouter from "./pages/DashboardRouter";
import Restricted from "./pages/Restricted.js";
import CompleteProfile from "./pages/CompleteProfile.js";

import { GoogleOAuthProvider } from "@react-oauth/google";

import { Toaster } from "react-hot-toast";
import SponsorStatus from "./pages/sponsor-status.js";
import PaymentVerification from "./pages/payment-verification.js";

function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
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
          <Routes>
            <Route path="/" element={<AppHome />} />
            <Route path="/coming-soon" element={<AppComing />} />
            <Route
              path="/help"
              element={<PrivateRoute component={AppHelp} />}
            />
            <Route path="/success" element={<AppSuccess />} />
            <Route path="/user-auth" element={<AppAuth />} />
            <Route path="/dashboard" element={<DashboardRouter />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/payment-verification/*" element={<PaymentVerification />} />
            <Route
              path="/fund-learner"
              element={<PrivateRoute component={AppFundLearner} />}
            />
            <Route
              path="/help-learner"
              element={<PrivateRoute component={AppHelpLearner} />}
            />
            <Route
              path="/sponsor-status/*"
              element={<PrivateRoute component={SponsorStatus} />}
            />
            <Route path="/restricted" element={<Restricted />} />
            <Route path="/complete-profile" element={<CompleteProfile />} />
          </Routes>
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
