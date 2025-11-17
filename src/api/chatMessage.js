import axiosClient from "./axiosClient";

const chatMessageApi = {
  fetchHistoryMessages: (type, targetId) => {
    return axiosClient.get('/messages', {
      params: { type, targetId: targetId }
    });
  },
  deleteHistoryMessages: (type, targetId) => {
    return axiosClient.delete('/messages', {
      params: { type, targetId: targetId }
    });
  },
};

export default chatMessageApi;
