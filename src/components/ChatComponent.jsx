import React, { useState, useEffect } from 'react';
import sockjs from 'sockjs-client/dist/sockjs';
import { Client } from '@stomp/stompjs';

const ChatComponent = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [client, setClient] = useState(null);

  // Khởi tạo kết nối WebSocket khi component mount
  useEffect(() => {
    const socket = new sockjs('http://localhost:8080/ws'); // Kết nối SockJS tới endpoint của backend
    const stompClient = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        stompClient.subscribe('/topic/messages', function (messageOutput) {
          setMessages((prevMessages) => [...prevMessages, messageOutput.body]);
        });
      },
      onStompError: function (frame) {
        console.error('STOMP error:', frame);
      },
    });

    stompClient.activate();
    setClient(stompClient);

    return () => stompClient.deactivate(); // Cleanup khi component unmount
  }, []);

  const sendMessage = () => {
    if (client && message) {
      client.publish({
        destination: '/app/sendMessage',
        body: message,
      });
      setMessage('');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-purple-700 mb-4 text-center">WebSocket Chat</h2>
        <div className="flex flex-col h-80 border rounded-lg bg-gray-50 p-4 mb-4 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="text-gray-400 text-center my-auto">Chưa có tin nhắn nào</div>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className="mb-2 flex items-start"
              >
                <div className="bg-purple-100 text-purple-800 px-3 py-2 rounded-lg shadow-sm max-w-xs">
                  {msg}
                </div>
              </div>
            ))
          )}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Nhập tin nhắn..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            onClick={sendMessage}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition"
          >
            Gửi
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
