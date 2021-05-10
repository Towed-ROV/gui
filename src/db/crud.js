import { get, post, put, del, post_raw } from "../services/api-methods";
import {
  WAYPOINT_SESSIONS,
  COMMANDS,
  WAYPOINTS,
  SENSORS,
  VIDEOS,
  VIDEO_PREFERENCE,
  SNAP,
  TOGGLE_RECORDING,
  UNCOMPLETED,
  COMPLETED,
  SETTINGS,
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
    return await put(WAYPOINT_SESSIONS + session_id, payload);
  } catch (err) {
    console.log(err);
  }
};

export const getSessions = async () => {
  try {
    return await get(WAYPOINT_SESSIONS + UNCOMPLETED);
  } catch (err) {
    console.log(err);
  }
};

export const deleteSession = async (sessId) => {
  try {
    await del(WAYPOINTS, sessId); // Connected waypoints
    return await del(WAYPOINT_SESSIONS, sessId); // Connected waypoint session
  } catch (err) {
    console.log(err);
  }
};

export const getCompletedSessions = async () => {
  try {
    return await get(WAYPOINT_SESSIONS + COMPLETED);
  } catch (err) {
    console.log(err);
  }
};

export const sendCommand = async (
  name,
  value,
  toSystem = false,
  config = false
) => {
  const payload = {
    name: name,
    value: value,
    toSystem: toSystem,
    config: config,
  };
  try {
    return await post(COMMANDS, payload);
  } catch (err) {
    console.log(err);
  }
};

export const sendSettingsCommand = async (
  name,
  origin,
  port,
  toSystem = false,
  config = true
) => {
  const payload = {
    name: name,
    origin: origin,
    port: port,
    toSystem: toSystem,
    config: config,
  };
  try {
    console.log("Sending setting: ", payload);
    return await post(COMMANDS, payload);
  } catch (err) {
    console.log(err);
  }
};

export const getWaypointsFromSession = async (sessionId) => {
  try {
    return await get(WAYPOINTS + sessionId);
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
  try {
    return await get(SENSORS + TOGGLE_RECORDING);
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
  const preference = {
    action: action,
    display_mode: mode,
  };
  return await post(VIDEO_PREFERENCE, preference);
};

export const takeSnapshot = async () => {
  return await get(VIDEOS + SNAP);
};

export const createSetting = async (setting) => {
  return await post(SETTINGS, setting);
};

export const getSettings = async () => {
  return await get(SETTINGS);
};

export const getSetting = async (id) => {
  return await get(SETTINGS + id);
};

export const updateSetting = async (id, enabled) => {
  const updateSensor = { enabled: enabled };
  return await put(SETTINGS + id, updateSensor);
};

export const deleteSetting = async (id) => {
  return await del(SETTINGS, id);
};
