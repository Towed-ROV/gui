import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "leaflet/dist/leaflet.css";
import { ChakraProvider, CSSReset, extendTheme } from "@chakra-ui/react";

const rovTheme = extendTheme({
  colors: {
    rov: {
      dark: "#0B0C10",
      darker: "#1F2833",
      light: "#C5C6C7",
      cyan: "#66FCF1",
      cyaner: "#45A29E",
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={rovTheme}>
      <CSSReset />
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
