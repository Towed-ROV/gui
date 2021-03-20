import api from "../services/api";

const types = [];

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
    // console.log(cmd);
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

const sendSensorData = () => {};
