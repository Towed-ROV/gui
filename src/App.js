import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import tempIMG from "./assets/480p.png";
import { Flex, Button } from "@chakra-ui/react";

import Navbar2 from "./components/Navbar2";
import NumberFormField from "./components/NumberFormField";

function App() {
  const [data, setData] = useState(" ... ");

  useEffect(() => {
    let eventSource = new EventSource("http://localhost:8000/stream");
    eventSource.addEventListener("stuff", (e) => setData(e.data));
    eventSource.addEventListener("close", () => eventSource.close());
    return () => eventSource.close();
  }, []);

  return (
    <Flex bg="cyan" direction="column" align="center" justify="center">
      <Navbar2 />
      <img src="http://localhost:8000/video" alt="noVideo" />
      <Flex margin="5">
        <NumberFormField />
      </Flex>
      <pre>{data}</pre>
    </Flex>
  );
}
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
