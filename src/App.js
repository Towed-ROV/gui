import React from "react";
import { Switch, Route, HashRouter } from "react-router-dom";

import { SettingsProvider } from "./components/SettingsProvider";
import NotFoundPage from "./pages/NotFoundPage";
import NavIcon from "./components/NavIcon";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Home from "./pages/Home";
import Map from "./pages/Map";
import Test from "./discarded/Test";

function App() {
  return (
    <HashRouter>
      <SettingsProvider>
        <NavIcon />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/settings" component={Settings} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/map" component={Map} />
          <Route component={NotFoundPage} />
        </Switch>
      </SettingsProvider>
    </HashRouter>
  );
}

export default App;
