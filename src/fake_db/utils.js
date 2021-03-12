import api from "../services/api";

const types = [];

export const sendCommand = async (name, value) => {
  let URL = "/commands";
  let cmd = {
    name: name,
    value: value,
  };
  try {
    // const resp = api.post(URL, cmd);
    // const response = await resp.data;
    console.log("SENT: ", JSON.stringify(cmd, null, 2));
    // console.log("RECV: ", JSON.stringify(response, null, 2));
  } catch (err) {
    console.log(err);
  }
};

const processResponse = (input) => {
  let payload = JSON.parse(input);
  let name = payload.payload_name;
  let data = payload.payload_data;
  if (name === "sensor_data") {
    handleSensorResponse(data);
  } else if (name === "response") {
    handleSystemResponse(data);
  } else {
    //
  }
};

const handleSystemResponse = (data) => {};

const handleSensorResponse = (data) => {};

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