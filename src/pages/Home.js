import {
  Flex,
  Text,
  useColorModeValue,
  Button,
  Heading,
  Container,
  Stack,
  Image,
  Link,
  PopoverTrigger,
  Popover,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  PopoverHeader,
} from "@chakra-ui/react";
import React from "react";
import ROV_IMAGE from "../assets/rov.png";

const Home = () => {
  const boxColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Flex
      h="100vh"
      bg={boxColor}
      style={{ overflowY: "hidden", overflowX: "hidden" }}
    >
      <Container maxW={"5xl"}>
        <Stack
          textAlign={"center"}
          align={"center"}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            Towed ROV{" "}
            <Text as={"span"} color={"teal.400"}>
              2021
            </Text>
          </Heading>
          <Text color={"gray.500"} maxW={"3xl"}>
            An application designed and developed to control a remote-operated
            vehicle towed behind a vessel.
          </Text>
          <Stack spacing={6} direction={"row"}>
            <Popover>
              <PopoverTrigger>
                <Button
                  rounded={"full"}
                  px={6}
                  colorScheme={"teal"}
                  bg={"teal.400"}
                  _hover={{ bg: "teal.500" }}
                >
                  Get started
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader float="left">Awesome!</PopoverHeader>
                <PopoverBody>
                  Navigation Button in the top-left corner!
                </PopoverBody>
              </PopoverContent>
            </Popover>

            <Button rounded={"full"} px={6}>
              <Link href="https://github.com/Towed-ROV/gui" isExternal>
                Learn more
              </Link>
            </Button>
          </Stack>
          <Flex w={"full"}>
            <Image src={ROV_IMAGE} />
          </Flex>
        </Stack>
      </Container>
    </Flex>
  );
};

export default Home;

/*{ <Flex
h="100vh"
color={textColor}
bg="rov.jpg"
align="center"
justify="center"

bgPosition="center"
bgRepeat="no-repeat"
backgroundClip="content-box"
>
<VStack>
  <Heading color="white" fontSize="5xl">
    TOWED ROV 2021
  </Heading>
</VStack>
</Flex> }*/
