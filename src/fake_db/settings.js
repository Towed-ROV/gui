export const rovControlNames = [
  { name: "set_point_depth", id: 0 },
  { name: "camera_offset_angle", id: 1 },
  { name: "pid_depth_p", id: 2 },
  { name: "pid_depth_i", id: 3 },
  { name: "pid_depth_d", id: 4 },
  { name: "pid_roll_p", id: 5 },
  { name: "pid_roll_i", id: 6 },
  { name: "pid_roll_d", id: 7 },
  { name: "depth_beneath_rov_offset", id: 8 },
  { name: "manual_wing_pos", id: 9 },
  { name: "depth_rov_offset", id: 10 },
];

const dummyData = [
  {
    name: "Temperature",
    origin: "Arduino 1",
    role: "PUB",
    port: "A5",
  },
  {
    id: 22,
    name: "Pressure",
    origin: "Arduino 2",
    role: "PUBSUB",
    port: "COM4",
  },
  {
    name: "Humidity",
    origin: "Arduino 3",
    role: "SUB",
    port: "D11",
  },
  {
    name: "Oxygen",
    origin: "Arduino 1",
    role: "PUB",
    port: "A0",
  },
];
