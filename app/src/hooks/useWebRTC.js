import { useState, useEffect, useRef, useContext } from "react";
import SimplePeer from "simple-peer";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const useWebRTC = ({ interviewId }) => {
  console.log(interviewId);
  const { user } = useContext(AuthContext);
  const [peer, setPeer] = useState(
    new SimplePeer({
      initiator: user.role == "manager",
    })
  );
  const videoRef = useRef();
  const chatRef = useRef();
  const editorRef = useRef();

  const sendDataToServer = (offer) => {
    axios.post(`http://localhost:8080/interview/${interviewId}`, {
      offer,
      from: user.role,
      init: user.role == "manager",
    });
  };

  const pollForData = () => {
    axios.get(`http://localhost:8080/interview/${interviewId}`).then((res) => {
      console.log(res.data);
      if (user.role == "user") {
        peer.signal(res.data["manager"]);
      } else {
        peer.signal(res.data["user"]);
      }
    });
  };

  useEffect(() => {
    if (peer != null) {
      peer.addListener("signal", (data) => {
        if (data.type !== "candidate") sendDataToServer(data);
      });
      let interval = setInterval(() => {
        pollForData();
      }, 5000);

      peer.addListener("connect", () => {
        console.log("connected");
      });

      return () => clearInterval(interval);
    }
  }, []);

  return [peer, videoRef, chatRef, editorRef];
};

export default useWebRTC;
