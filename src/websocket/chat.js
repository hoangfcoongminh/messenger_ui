import { toast } from "react-toastify";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

let stompClient = null;

export const connect = (roomId, onMessageReceived) => {
  const socket = new SockJS("http://localhost:8080/ws");
  stompClient = new Client({
    webSocketFactory: () => socket,
    onConnect: () => {
      stompClient.subscribe(`/topic/messages/${roomId}`, (msg) => {
        const message = JSON.parse(msg.body);
        onMessageReceived(message);
      });
    },
    onStompError: (error) => {
      toast.error("WebSocket connection error", error);
    },
  });
  stompClient.activate();
};

export const sendMessage = (roomId, message) => {
  if (!stompClient || !stompClient.active) {
    return;
  }
  const sender = localStorage.getItem("uid");
  const chatMessage = { roomId, sender, message };
  console.log("Sending message: ", chatMessage);
  
  stompClient.publish({
    destination: "/app/sendMessage",
    body: JSON.stringify(chatMessage),
  });
};

export const disconnect = () => {
  if (stompClient) {
    stompClient.deactivate();
  }
};
