import "./App.css";
import Messenger from "./pages/Messenger.jsx";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Messenger />
    </>
  );
}

export default App;
