import axios from "axios";
import axiosRetry from "axios-retry";

import config from "config/config";

// const config = {
//   apiBaseUrl: "https://console.hikewise.in/api",
// };

axiosRetry(axios, { retries: 1 });

function getAuthHeader() {
  if ("accessToken" in localStorage) return localStorage.getItem("accessToken");
  else if ("accessToken" in sessionStorage) return sessionStorage.getItem("accessToken");
  else return ``;
}

axios.interceptors.response.use(
  (response) => {
    return Promise.resolve(response);
  },
  (error) => {
    if (error && error.response && error.response.status === 403) {
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "/";
      return;
    }

    return Promise.reject(error);
  }
);

export const getRequest = (path, options) => {
  let removeTrailingSlash = false;
  let noAuth = false;
  if (options) {
    if (options.removeTrailingSlash) removeTrailingSlash = true;
    if (options.noAuth) noAuth = true;
  }

  let headers = {
    "Content-Type": "application/json",
  };
  if (!noAuth) headers.Authorization = `Bearer ${getAuthHeader()}`;

  return axios.get(`${config.apiBaseUrl}${path}${removeTrailingSlash ? "" : "/"}`, {
    headers,
  });
};

export const postRequest = (path, data, options) => {
  let removeTrailingSlash = false;
  let noAuth = false;
  if (options) {
    if (options.removeTrailingSlash) removeTrailingSlash = true;
    if (options.noAuth) noAuth = true;
  }

  let headers = {
    "Content-Type": "application/json",
  };
  if (!noAuth) headers.Authorization = `Bearer ${getAuthHeader()}`;

  return axios.post(`${config.apiBaseUrl}${path}${removeTrailingSlash ? "" : "/"}`, data, {
    headers,
  });
};

export const putRequest = (path, data) => {
  return axios.put(`${config.apiBaseUrl}${path}/`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthHeader()}`,
    },
  });
};

export const patchRequest = (path, data) => {
  return axios.patch(`${config.apiBaseUrl}${path}/`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthHeader()}`,
    },
  });
};

export const deleteRequest = (path, data) => {
  const headers = { Authorization: `Bearer ${getAuthHeader()}` };
  return axios.delete(`${config.apiBaseUrl}${path}`, { headers, data });
};

export const multiGetRequest = async (paths, options) => {
  let arr = [];

  let removeTrailingSlash = false;
  if (options) {
    if (options.removeTrailingSlash) removeTrailingSlash = true;
  }

  paths.forEach((item) => {
    arr.push(
      axios.get(`${config.apiBaseUrl}${item}${removeTrailingSlash ? "" : "/"}`, {
        headers: {
          Authorization: `Bearer ${getAuthHeader()}`,
        },
      })
    );
  });
  return axios.all(arr);
};

export const multiPostRequest = async (configs) => {
  let arr = [];
  const authToken = getAuthHeader();
  configs.forEach((item) => {
    arr.push(
      axios.post(`${config.apiBaseUrl}${item.url}/`, item.data, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
    );
  });
  return axios.all(arr);
};
