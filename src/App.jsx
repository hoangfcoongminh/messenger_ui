import React, { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar.jsx";
import SearchUser from "./components/SearchUser.jsx";
import ChatRoomList from "./components/ChatRoomList.jsx";
import CreateChatRoom from "./components/CreateChatRoom.jsx";
import ChatRoom from "./components/ChatRoom.jsx";
import ChatComponent from "./components/ChatComponent.jsx";

// Dummy data for demo
const initialRooms = [
  { id: "1", name: "Phòng chung" },
  { id: "2", name: "Nhóm học React" },
];

function App() {
  const [chatRooms, setChatRooms] = useState(initialRooms);
  const [selectedRoomId, setSelectedRoomId] = useState(
    chatRooms[0]?.id || null
  );
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
    // TODO: Tìm kiếm người dùng từ backend
  };

  const handleCreateRoom = (roomName) => {
    const newRoom = {
      id: Date.now().toString(),
      name: roomName,
    };
    setChatRooms((prev) => [...prev, newRoom]);
    setSelectedRoomId(newRoom.id);
  };

  const handleSelectRoom = (roomId) => {
    setSelectedRoomId(roomId);
  };

  const selectedRoom = chatRooms.find((room) => room.id === selectedRoomId);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar>
        <SearchUser onSearch={handleSearch} />
        <CreateChatRoom onCreate={handleCreateRoom} />
        <ChatRoomList
          chatRooms={chatRooms}
          onSelectRoom={handleSelectRoom}
          selectedRoomId={selectedRoomId}
        />
      </Sidebar>
      <main className="flex-1 flex flex-col">
        <ChatRoom room={selectedRoom}>
          {/* TODO: Truyền roomId vào ChatComponent để chat theo phòng */}
          <ChatComponent />
        </ChatRoom>
      </main>
    </div>
  );
}

export default App;
