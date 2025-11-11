import axiosClient from "./axiosClient";

const userApi = {
  signup: (payload) => axiosClient.post("/users/signup", payload),
  login: (username) =>
    axiosClient.post(`/users/login?username=${encodeURIComponent(username)}`),
  search: (payload) => axiosClient.post("/users/search", payload),
};

export default userApi;
