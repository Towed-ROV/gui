import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Flex,
  Button,
  Box,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import Nav from "./components/Nav";
import NumberFormField from "./components/NumberFormField";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Map from "./pages/Map";
import SensorDisplay from "./components/SensorDisplay";
import Navbar from "./components/Navbar";
import { SensorCard } from "./components/SensorCard";

function App() {
  return (
    <Router>
      <Flex direction="column" align="center" justify="space-around">
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/map" component={Map} />
        </Switch>
      </Flex>
    </Router>
  );
}

const Home = () => {
  return <div>Homepage</div>;
};
export default App;

//  <JsonHandler />
//<div><img src="http://localhost:8000/video" alt="nada" /></div>

// <img src={tempIMG} alt="Empty img" />
/* <Grid container className={classes.root}>
  <Grid item className={classes.item}>
    A Hello
  </Grid>
  <Grid item className={classes.item}>
    B Hello
  </Grid>
  <Grid item className={classes.item}>
    C Hello
  </Grid>
</Grid> */

// <Content>
// <Header />
// <Main>
//   <Box fontSize={["sm", "md", "lg", "xl"]}>Font Size</Box>
//   {/* responsive margin */}
//   <Box mt={["10px", "20px"]} width="full" height="24px" bg="tomato" />
//   {/* responsive padding */}
//   <Box bg="papayawhip" p={[2, 4, 6, 8]}>
//     Padding
//   </Box>
//   <Text fontSize={{ base: "24px", md: "40px", lg: "56px" }}>
//     This is responsive text
//   </Text>
// </Main>
// </Content>
