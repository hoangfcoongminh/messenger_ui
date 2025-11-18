import axiosClient from "./axiosClient";

const chatRoomApi = {
  getChatRooms: (type) => axiosClient.get("/chat-rooms", {
    params: { type }
  }),
  createChatRoom: (payload) => axiosClient.post("/chat-rooms", payload),
};

export default chatRoomApi;
