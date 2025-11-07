import axiosClient from "./axiosClient";

const chatRoomApi = {
    getChatRooms: () => axiosClient.get("/chat-rooms"),
    createChatRoom: (payload) => axiosClient.post("/chat-rooms", payload),
}

export default chatRoomApi;