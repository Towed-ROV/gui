import React from "react";
import { Switch, Route, HashRouter } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Map from "./pages/Map";
import Navbar from "./components/Navbar";
import Settings from "./pages/Settings";
import { SettingsProvider } from "./components/SettingsProvider";
import NotFoundPage from "./pages/NotFoundPage";
import Test from "./pages/Test";

function App() {
  return (
    <HashRouter>
      <SettingsProvider>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/settings" component={Settings} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/map" component={Map} />
          <Route path="/test" component={Test} />
          <Route component={NotFoundPage} />
        </Switch>
      </SettingsProvider>
    </HashRouter>
  );
}

export default App;
