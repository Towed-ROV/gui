import api from "./api";

export const get = async (url) => {
  try {
    const response = await api.get(url);
    return await response.data;
  } catch (err) {
    console.log(err);
  }
};

export const post_raw = async (url, content) => {
  return await api.post(url, content);
};

export const post = async (url, content) => {
  try {
    const response = await api.post(url, content);
    return await response.data;
  } catch (err) {
    console.log(err);
  }
};

export const put = async (url, content) => {
  try {
    const response = await api.put(url, content);
    return await response.data;
  } catch (err) {
    console.log(err);
  }
};

export const del = async (url, sessID) => {
  try {
    const response = await api.delete(url + sessID);
    return await response.data;
  } catch (err) {
    console.log(err);
  }
};
