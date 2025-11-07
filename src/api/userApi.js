import axiosClient from "./axiosClient";

const userApi = {
  search: (payload) => axiosClient.post("/users/search", payload),
};

export default userApi;
