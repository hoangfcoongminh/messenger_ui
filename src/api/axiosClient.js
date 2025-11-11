import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

// Thêm interceptor để tự động truyền uid từ localStorage vào header
axiosClient.interceptors.request.use(
  (config) => {
    const uid = localStorage.getItem("uid");
    if (uid) {
      config.headers["uid"] = uid;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosClient;
