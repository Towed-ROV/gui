import { get, post, put, del, post_raw } from "../services/api-methods";
import {
  WAYPOINT_SESSIONS,
  COMMANDS,
  WAYPOINTS,
  SENSORS,
  VIDEOS,
  VIDEO_PREFERENCE,
} from "./config";

export const createSession = async (session_id) => {
  let details = undefined;
  try {
    details = await post_raw(WAYPOINT_SESSIONS, { session_id: session_id });
  } catch (err) {
    details = "DUPLICATE";
  }
  return details;
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

export const deleteSession = async (sessId) => {
  try {
    const _ = await del(WAYPOINTS, sessId); // Connected waypoints
    return await del(WAYPOINT_SESSIONS, sessId); // Connected waypoint session
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
  console.log(payload);
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

export const toggleVideo = async (toggle, mode) => {
  let action = "";
  if (toggle) {
    action = "start";
  } else {
    action = "stop";
  }
  const content = {
    action: action,
    display_mode: mode,
  };
  return await post(VIDEO_PREFERENCE, content);
};

export const takeSnapshot = async () => {
  const ACTION = "snap";
  return await get(VIDEOS + ACTION);
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
