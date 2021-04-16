import { get } from "../services/api-methods";
import { post } from "../services/api-methods";
import { put } from "../services/api-methods";
import { del } from "../services/api-methods";

// DB ENDPOINTS
const WAYPOINT_SESSIONS = "/waypoint_sessions/";
const WAYPOINTS = "/waypoints/";
const SENSORS = "/sensors/";
const VIDEOS = "/videos/";
const COMMANDS = "/commands/";

export const createSession = async (session_id) => {
  let dbError = undefined;
  try {
    return await post(WAYPOINT_SESSIONS, { session_id: session_id });
  } catch (err) {
    dbError = "DUPLICATE";
    console.log(err);
  }
  return dbError;
};

export const updateSession = async (session_id, is_complete) => {
  const payload = {
    session_id: session_id,
    is_complete: is_complete,
  };
  try {
    return await post(WAYPOINT_SESSIONS + session_id, payload);
  } catch (err) {
    console.log(err);
  }
};

export const getSessions = async () => {
  const STATUS = "uncompleted";
  try {
    return await get(WAYPOINT_SESSIONS + STATUS);
  } catch (err) {
    console.log(err);
  }
};

export const getCompletedSessions = async () => {
  const STATUS = "completed";
  try {
    return await get(WAYPOINT_SESSIONS + STATUS);
  } catch (err) {
    console.log(err);
  }
};

export const sendCommand = async (name, value, toSystem = false) => {
  const payload = {
    name: name,
    value: value,
    toSystem: toSystem,
  };
  try {
    return await post(COMMANDS, payload);
  } catch (err) {
    console.log("ERROR YO : ", err);
  }
};

export const getWaypointsFromSession = async (sessionId) => {
  const URL = WAYPOINTS + sessionId;
  try {
    return await get(URL);
  } catch (err) {
    console.log(err);
  }
};

export const createWaypoint = async (sessionId, latLng, sensorData) => {
  let payload = {
    session_id: sessionId,
    latitude: latLng[0],
    longitude: latLng[1],
    sensors: sensorData,
  };
  try {
    return await post(WAYPOINTS, payload);
  } catch (err) {
    console.log(err);
  }
};

export const toggleRecording = async () => {
  const ACTION = "toggle_recording";
  try {
    return await get(SENSORS + ACTION);
  } catch (err) {
    console.log(err);
  }
};

export const toggleVideo = async (toggle) => {
  let ACTION = "";
  if (toggle) {
    ACTION = "start";
  } else {
    ACTION = "stop";
  }
  return await get(VIDEOS + ACTION);
};

export const takeSnapshot = async () => {
  const ACTION = "snap";
  return await post(VIDEOS + ACTION);
};

// export const postSome = async (url) => {
//   try {
//     const response = await api.get(url);
//     const data = await response.data;
//     console.log(await JSON.stringify(data, null, 2));
//   } catch (err) {
//     console.log(err);
//   }
// };
