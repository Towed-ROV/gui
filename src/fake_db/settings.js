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
