export const dummyData = [
  {
    id: 0,
    name: "temperature",
    value: 123,
  },
  {
    id: 1,
    name: "depth",
    value: 3,
  },
  {
    id: 2,
    name: "roll",
    value: 0.123,
  },
  {
    id: 3,
    name: "pitch",
    value: 100002,
  },
  {
    id: 4,
    name: "yaw",
    value: 1003.111,
  },
  {
    id: 5,
    name: "pid_depth_p",
    value: 1,
  },
  {
    id: 6,
    name: "pid_depth_i",
    value: 333,
  },
  {
    id: 7,
    name: "pid_depth_d",
    value: 0.0055,
  },
];

export const fakeSensors = [
  {
    name: "temperature",
    value: 0,
  },
  {
    name: "oxygen",
    value: 0,
  },
  {
    name: "latitude",
    value: 62.383713,
  },
  {
    name: "depth",
    value: 0,
  },
  {
    name: "longitude",
    value: 6.977545,
  },
];

export const testDataLngLat = [
  {
    id: 0,
    latitude: 62.383713,
    longitude: 6.977545,
  },
  {
    id: 1,
    latitude: 62.383713,
    longitude: 6.977545 + 0.001,
  },
  {
    id: 2,
    latitude: 62.383713,
    longitude: 6.977545 + 0.002,
  },
  {
    id: 3,
    latitude: 62.383713,
    longitude: 6.977545 + 0.003,
  },
];

export const fakeSettings = [
  {
    id: 3,
    name: "Temperature",
    origin: "Arduino 1",
    role: "PUB",
    port: "A5",
    enabled: false,
  },
  {
    id: 22,
    name: "Pressure",
    origin: "Arduino 2",
    role: "PUBSUB",
    port: "COM4",
    enabled: false,
  },
  {
    id: 1,
    name: "Humidity",
    origin: "Arduino 3",
    role: "SUB",
    port: "D11",
    enabled: false,
  },
  {
    id: 99,
    name: "Oxygen",
    origin: "Arduino 1",
    role: "PUB",
    port: "A0",
    enabled: false,
  },
  {
    id: 33,
    name: "Oxygen",
    origin: "Arduino 1",
    role: "PUB",
    port: "A0",
    enabled: false,
  },
  {
    id: 13,
    name: "Oxygen",
    origin: "Arduino 1",
    role: "PUB",
    port: "A0",
    enabled: false,
  },
  {
    id: 6,
    name: "Oxygen",
    origin: "Arduino 1",
    role: "PUB",
    port: "A0",
    enabled: false,
  },
  {
    id: 66,
    name: "Oxygen",
    origin: "Arduino 1",
    role: "PUB",
    port: "A0",
    enabled: false,
  },
];
