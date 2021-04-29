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

// const seedDatabase = async () => {
//   // A pure test method for seeding the database with 'x' samples.
//   const totalSamples = 10;
//   let data = [...fakeSensors];
//   let samples = [];
//   let step = 0;

//   const sessID = "Session-123";
//   await createSession(sessID);

//   const LAT = fakeSensors.filter((sensor) => sensor.name === "latitude")[0]
//     .value;
//   const LNG = fakeSensors.filter((sensor) => sensor.name === "longitude")[0]
//     .value;
//   for (let i = 0; i < totalSamples; i++) {
//     samples.push(LNG + step);
//     step += 0.001;
//   }
//   for await (let samp of samples) {
//     await createWaypoint(sessID, [LAT, samp], data);
//   }
//   const isComplete = true;
//   await updateSession(sessID, isComplete);
// };

// const fakeCMD = [
//   {
//     name: "temperature",
//     value: 20.53,
//   },
//   {
//     name: "heat",
//     value: 1.02,
//   },
//   {
//     name: "oxygen",
//     value: 0.1004,
//   },
//   {
//     name: "depth",
//     value: 104,
//   },
// ];

// const fakeRES = [
//   {
//     name: "Temperature",
//     success: true,
//   },
//   {
//     name: "Temperature",
//     success: false,
//   },
//   {
//     name: "Temperature",
//     success: true,
//   },
//   {
//     name: "Temperature",
//     success: false,
//   },
// ];
