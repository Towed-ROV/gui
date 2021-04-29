// ENDPOINTS
export const VIDEOS = "/videos/";
export const VIDEO_PREFERENCE = "/videos/preference";
export const WAYPOINTS = "/waypoints/";
export const WAYPOINT_SESSIONS = "/waypoint_sessions/";
export const SENSORS = "/sensors/";
export const COMMANDS = "/commands/";
export const SETTINGS = "/settings/";

// ENDPOINT SUFFIXES
export const LIVE = "live";
export const UNCOMPLETED = "uncompleted";
export const COMPLETED = "completed";
export const TOGGLE_RECORDING = "toggle_recording";
export const SNAP = "snap";

// API BASE_URL
export const BASE_URL = "http://localhost:8000";

// STREAMS
export const VIDEO_LIVE_STREAM = BASE_URL + VIDEOS + LIVE;
export const SENSOR_LIVE_STREAM = BASE_URL + SENSORS + LIVE;

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

// TOWD ROV CONTROL NAMES
export const lights_on_off = "lights_on_off";
export const camera_offset_angle = "camera_offset_angle";
export const brightness_light = "brightness_light";
