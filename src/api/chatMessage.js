import axiosClient from "./axiosClient";

const chatMessageApi = {
  fetchHistoryMessages: (roomId) => {
    return axiosClient.get(`/messages/${roomId}`);
  },
  deleteHistoryMessages: (roomId) => {
    return axiosClient.delete(`/messages/${roomId}`);
  },
};

export default chatMessageApi;
