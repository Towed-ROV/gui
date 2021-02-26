import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Map from "./pages/Map";
import Navbar from "./components/Navbar";
import Settings from "./pages/Settings";
import Footer from "./components/Footer";
import { SettingsProvider } from "./components/SettingsProvider";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Router>
      <SettingsProvider>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/settings" component={Settings} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/map" component={Map} />
          <Route component={NotFoundPage} />
        </Switch>
      </SettingsProvider>
      <Footer />
    </Router>
  );
}

export default App;
