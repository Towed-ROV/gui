import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@material-ui/core";

const getSome = async (url) => {
  try {
    const response = await axios.get(url);
    const data = await response.data;
    return await JSON.stringify(data, null, 2);
  } catch (err) {
    console.log(err);
  }
  return "Nothing found ... ";
};

const JsonHandler = () => {
  let counter = 0;

  const URL = "http://localhost:8000/hello";

  const [data, setData] = useState("Empty stuff here .. ");

  const doStuff = async () => {
    setData((await getSome(URL)) || "Nothing ... ");
    counter = counter + 1;
    console.log("D: ", counter);
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setData((await getSome(URL)) || "Nothing ... ");
  //   };
  //   fetchData();
  // }, []);

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          doStuff();
        }}
      >
        Click me
      </Button>
      <pre>{data}</pre>
    </div>
  );
};

export default JsonHandler;

/**
 *   useEffect(async () => {
    const url = "httppppppppp";

    async function fetchData(url) {
      const response = await axios.get(url);
      const dataInfo = await response.json();
    }

    fetchData();
  }, [data]);

  <div>
      {data.hits.map(item => (
        <li key={item.objectID}>
          <a href={item.url}>{item.title}</a>
        </li>
      ))}
  </div>


 */
