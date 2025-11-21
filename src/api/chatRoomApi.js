import axiosClient from "./axiosClient";

const chatRoomApi = {
  getChatRooms: (type) => {
    if (type) {
      return axiosClient.get("/chat-rooms", { params: { type } });
    }
    return axiosClient.get("/chat-rooms");
  },
  createChatRoom: (payload) => axiosClient.post("/chat-rooms", payload),
};

export default chatRoomApi;
