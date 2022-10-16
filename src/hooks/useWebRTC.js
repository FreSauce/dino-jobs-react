import { useState, useEffect, useRef, useContext } from "react";
import SimplePeer from "simple-peer";
import { AuthContext } from "../context/AuthContext";

const useWebRTC = () => {
  const { user } = useContext(AuthContext);
  const [peer, setPeer] = useState(
    new SimplePeer({
      initiator: true,
    })
  );
  const videoRef = useRef();
  const chatRef = useRef();
  const editorRef = useRef();

  useEffect(() => {
    setPeer(
      new SimplePeer({
        initiator: user.role === "manager",
      })
    );
  }, []);

  sendOfferToServer = (offer) => {};

  useEffect(() => {
    if (peer != null) {
      peer.addListener("signal", (data) => {
        if (data.type === "offer") {
          console.log("offer", data);
        }
        if (data.type === "answer") {
          console.log("answer", data);
        }
      });
    }
    return () => peer.destroy();
  }, [peer]);

  return [peer, videoRef, chatRef, editorRef];
};

export default useWebRTC;
