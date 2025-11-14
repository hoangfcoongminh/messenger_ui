import React, { useState, useEffect } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar.jsx";
import SearchUser from "./components/SearchUser.jsx";
import ChatRoomList from "./components/ChatRoomList.jsx";
import ChatRoom from "./components/ChatRoom.jsx";
import ChatComponent from "./components/ChatComponent.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [fullName, setFullName] = useState("");
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    // Lấy fullName từ localStorage khi app khởi động
    const fullName = localStorage.getItem("fullName");
    if (fullName) {
      setFullName(fullName);
    }
  }, []);

  const handleLogin = (name) => {
    setFullName(name);
    localStorage.setItem("fullName", name);
    setShowSignup(false);
  };

  const handleSignup = (name) => {
    setFullName(name);
    localStorage.setItem("fullName", name);
    setShowSignup(false);
  };

  const handleShowSignup = () => setShowSignup(true);
  const handleShowLogin = () => setShowSignup(false);

  const handleSelectRoom = (roomId) => {
    setSelectedRoomId(roomId);
  };

  const handleLogout = () => {
    localStorage.removeItem("fullName");
    localStorage.removeItem("uid");
    setFullName("");
    setSelectedRoomId(null);
  };

  if (!fullName) {
    return showSignup ? (
      <Signup onSignup={handleSignup} onShowLogin={handleShowLogin} />
    ) : (
      <Login onLogin={handleLogin} onShowSignup={handleShowSignup} />
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <ToastContainer position="top-right" autoClose={3000} />
      <Sidebar>
        <div className="mb-4 flex items-center justify-between">
          <span className="font-semibold text-blue-700">
            Xin chào, {fullName}
          </span>
          <button
            onClick={handleLogout}
            className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm"
          >
            Đăng xuất
          </button>
        </div>
        <SearchUser />
        <ChatRoomList
          onSelectRoom={handleSelectRoom}
          selectedRoomId={selectedRoomId}
        />
      </Sidebar>
      <main className="flex-1 flex flex-col">
        {/* <ChatRoom room={selectedRoom}> */}
        {/* TODO: Truyền roomId vào ChatComponent để chat theo phòng */}
        <ChatComponent roomId={selectedRoomId} />
        {/* </ChatRoom> */}
      </main>
    </div>
  );
}

export default App;
