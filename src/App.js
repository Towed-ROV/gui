import React, { useState } from "react";
import MyMap from "./components/MyMap";
import "./App.css";
import JsonHandler from "./components/JsonHandler";

function App() {
  return (
    <div className="App">
      Testing!
      <JsonHandler />
      <div>
        <img src="http://localhost:8000/video" alt="nada" />
      </div>
    </div>
  );
}

export default App;
