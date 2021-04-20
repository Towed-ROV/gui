// ENDPOINTS
export const WAYPOINT_SESSIONS = "/waypoint_sessions/";
export const WAYPOINTS = "/waypoints/";
export const SENSORS = "/sensors/";
export const VIDEOS = "/videos/";
export const COMMANDS = "/commands/";

// ENDPOINT SUFFIXES
const LIVE = "live";

// STREAMS
export const VIDEO_LIVE_STREAM = VIDEOS + LIVE;
export const SENSOR_LIVE_STREAM = SENSORS + LIVE;

// Supported commands inside the Towed-ROV
// they all accept a float value
// ie: {name: "set_point_depth", value: 104.55}
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
