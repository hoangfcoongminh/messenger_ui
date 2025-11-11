import React, { useEffect, useState } from "react";
import CreateChatRoomForm from "./CreateChatRoomForm";
import chatRoomApi from "../api/chatRoomApi";

const ChatRoomList = () => {
  const [chatRooms, setChatRooms] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [newChatRoom, setNewChatRoom] = useState(null);
  const [isOpenCreateForm, setIsOpenCreateForm] = useState(false);

  useEffect(() => {
    fetchChatRooms();
  }, []);

  const fetchChatRooms = () => {
    chatRoomApi
      .getChatRooms()
      .then((response) => {
        setChatRooms(response.data);
      })
      .catch((error) => {
        console.error("Error fetching chat rooms:", error);
      });
  };

  const handleCreateRoom = (roomName) => {
    chatRoomApi
      .createChatRoom({ name: roomName })
      .then((response) => {
        const newRoom = response.data;
        setChatRooms((prev) => [...prev, newRoom]);
      })
      .catch((error) => {
        console.error("Error creating chat room:", error);
      });
  };
 
  return (
    <>
      <div className="flex-1 overflow-y-auto">
        <h3 className="text-lg font-semibold mb-2">Phòng chat của bạn</h3>
        {chatRooms.length === 0 ? (
          <div className="text-gray-400">Chưa có phòng chat nào</div>
        ) : (
          chatRooms.map((room) => (
            <div
              key={room.id}
              className={`p-2 rounded-lg cursor-pointer mb-2 hover:bg-blue-100 transition ${
                selectedRoomId === room.id ? "bg-blue-200" : ""
              }`}
              onClick={() => setSelectedRoomId(room.id)}
            >
              <div className="font-medium">{room.name}</div>
            </div>
          ))
        )}
      </div>
      <CreateChatRoomForm onCreate={handleCreateRoom} />
    </>
  );
};

export default ChatRoomList;
