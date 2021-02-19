import {
  AspectRatio,
  Center,
  Flex,
  Grid,
  GridItem,
  Text,
  Image,
} from "@chakra-ui/react";
import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import Navbar from "../components/Navbar";
import Map from "./Map";

import imgPlaceholder from "../assets/offline.png";
import NumberFormField from "../components/NumberFormField";

const jsonPlaceholder = [
  {
    connection: "on",
    window: {
      title: "123123",
      name: "123123",
      width: 500,
      height: 500,
    },
    image: {
      src: "Images/Sun.png",
      name: "sun1",
      hOffset: 250,
      vOffset: 250,
      alignment: "center",
    },
    text: {
      data: "Click Here",
      size: 36,
      style: "bold",
      name: "text1",
      hOffset: 250,
      vOffset: 100,
      alignment: "center",
      onMouseUp: "0.111111111",
    },
  },
];

const pos = [62.5, 6.2];

const lol = { msg: "hello" };

const Home = () => {
  return (
    <Flex mx="20">
      <Grid
        h="750px"
        w="100%"
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(5, 1fr)"
        gap={4}
      >
        <GridItem bg="rov.cyaner" rowSpan={2} colSpan={1}>
          <pre>{JSON.stringify(jsonPlaceholder, null, 2)}</pre>
        </GridItem>
        <GridItem colSpan={2}>
          <Flex justify="center">
            <Image src={imgPlaceholder} alt="IMG EMPTY" />
          </Flex>
        </GridItem>
        <GridItem colSpan={2} bg="rov.cyaner">
          <MapContainer
            className="map"
            center={pos}
            zoom={12}
            style={{
              display: "flex",
              height: "100%",
              width: "100%",
            }}
          >
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </MapContainer>
        </GridItem>
        <GridItem colSpan={4} bg="rov.cyaner">
          <Flex p={12}>
            <NumberFormField />
          </Flex>
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default Home;
