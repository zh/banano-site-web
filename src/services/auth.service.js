import axios from "axios";

const ApiURL = "http://127.0.0.1:8080/";

const register = (username, address) => {
  return axios.post(ApiURL + "api/v1/account", {
    username,
    address,
  });
};

const getUserByUsername = (username) => {
  return axios.get(ApiURL + "u/" + username);
};

export default {
  register,
  getUserByUsername,
};
