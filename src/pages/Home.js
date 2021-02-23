import {
  Flex,
  Grid,
  GridItem,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
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

const Home = () => {
  const textColor = useColorModeValue("grey.900", "gray.200");
  const boxColor = useColorModeValue("gray.200", "gray.600");
  const pos = [62.4698, 6.1872];

  return (
    <Flex h="80vh" mx="2vw">
      <Grid
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(5, 1fr)"
        gap={4}
        w="100%"
        h="100%"
      >
        <GridItem
          bg={boxColor}
          boxShadow="dark-lg"
          rounded="lg"
          rowSpan={2}
          colSpan={1}
        >
          <pre>{JSON.stringify(jsonPlaceholder, null, 2)}</pre>
        </GridItem>
        <GridItem bg={boxColor} boxShadow="dark-lg" rounded="lg" colSpan={2}>
          <Flex justify="center">
            <Image src={imgPlaceholder} alt="IMG EMPTY" />
          </Flex>
        </GridItem>
        <GridItem bg={boxColor} boxShadow="dark-lg" rounded="lg" colSpan={2}>
          <MapContainer
            className="map"
            center={pos}
            zoom={16}
            style={{
              display: "flex",
              height: "100%",
              width: "100%",
            }}
          >
            <Marker position={pos} />
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </MapContainer>
        </GridItem>
        <GridItem bg={boxColor} boxShadow="dark-lg" rounded="lg" colSpan={2}>
          <Flex p={12}>
            <NumberFormField />
          </Flex>
        </GridItem>
        <GridItem bg={boxColor} boxShadow="dark-lg" rounded="lg" colSpan={2}>
          <Flex p={12}>
            <NumberFormField />
          </Flex>
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default Home;
