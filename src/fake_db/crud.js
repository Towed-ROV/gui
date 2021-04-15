import api from "../services/api";

export const createSession = async (session_id) => {
  const URL = "/waypoint_sessions/";
  let dbError = undefined;
  try {
    const resp = await api.post(URL, { session_id: session_id });
    // TODO: Send OK back to user
    const _ = await resp.data;
  } catch (err) {
    dbError = "DUPLICATE";
    console.log(err);
  }
  return dbError;
};

export const updateSession = async (session_id, is_complete) => {
  const URL = "/waypoint_sessions/" + session_id;
  const payload = {
    session_id: session_id,
    is_complete: is_complete,
  };
  try {
    const resp = await api.post(URL, payload);
    return await resp.data; // DO we need feedback?
  } catch (err) {
    console.log(err);
  }
};

export const getSessions = async () => {
  const URL = "/waypoint_sessions/uncompleted";
  try {
    const resp = await api.get(URL);
    return await resp.data;
  } catch (err) {
    console.log(err);
  }
};

export const getCompletedSessions = async () => {
  const URL = "/waypoint_sessions/completed";
  try {
    const resp = await api.get(URL);
    return await resp.data;
  } catch (err) {
    console.log(err);
  }
};

export const sendCommand = async (name, value, toSystem = false) => {
  let URL = "/commands/";
  let cmd = {
    name: name,
    value: value,
    toSystem: toSystem,
  };
  try {
    const resp = await api.post(URL, cmd);
    const response = await resp.data;
  } catch (err) {
    console.log("ERROR YO : ", err);
  }
};

// export const create = async (session_id) => {
//   const URL = "/waypoint_sessions/";
//   try {
//     const resp = await api.post(URL, { session_id: session_id });
//     const response = await resp.data;
//     console.log(response);
//   } catch (err) {
//     console.log(err);
//   }
// };

export const getWaypointsFromSession = async (sessionId) => {
  let URL = "/waypoints/" + sessionId;
  try {
    // console.log(payload);
    const resp = await api.get(URL);
    return await resp.data;
  } catch (err) {
    console.log(err);
  }
};

export const createWaypoint = async (sessionId, latLng, sensorData) => {
  let URL = "/waypoints/";
  let payload = {
    session_id: sessionId,
    latitude: latLng[0],
    longitude: latLng[1],
    sensors: sensorData,
  };
  try {
    // console.log(payload);
    const resp = await api.post(URL, payload);
    return await resp.data;
  } catch (err) {
    console.log(err);
  }
};

export const toggleRecording = async () => {
  const URL = "http://localhost:8000/sensors/toggle_recording";
  try {
    const response = await api.get(URL);
    const data = await response.data;
    // console.log(await JSON.stringify(data, null, 2));
  } catch (err) {
    console.log(err);
  }
};

const sendConnectionStatus = async (isConnected) => {
  sendCommand("is_running", isConnected);
};

const startRecording = async () => {
  const isRecording = true;
  _postRecording(isRecording);
};

const stopRecording = async () => {
  const isRecording = true;
  _postRecording(isRecording);
};

const _postRecording = async (status) => {
  const URL = "/recording";
  const payload = { is_recording: status };
  try {
    const resp = api.post(URL, payload);
    const response = await resp.data;
    console.log("Response: ", response);
  } catch (err) {
    console.log(err);
  }
};

export const toggleVideo = async (toggle) => {
  var url = "http://localhost:8000/videos/";
  if (toggle) {
    url += "video_start";
  } else {
    url += "video_stop";
  }
  await postSome(url);
};

export const takeSnapshot = async () => {
  await postSome("http://localhost:8000/videos/video_snapshot");
};

export const postSome = async (url) => {
  try {
    const response = await api.get(url);
    const data = await response.data;
    console.log(await JSON.stringify(data, null, 2));
  } catch (err) {
    console.log(err);
  }
};
