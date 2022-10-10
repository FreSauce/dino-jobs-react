import { useState, useEffect, useRef, useContext } from "react";
import SimplePeer from "simple-peer";
import { AuthContext } from "../context/AuthContext";

const useWebRTC = () => {
  const {
    state: { user },
  } = useContext(AuthContext);
  const [peer1, setPeer1] = useState();
  const [peer2, setPeer2] = useState();
  const videoRef = useRef();
  const chatRef = useRef();
  const editorRef = useRef();

  useEffect(() => {
    setPeer1(
      new SimplePeer({
        initiator: true,
      })
    );
  }, []);

  useEffect(() => {
    if (peer1 != null) {
      peer1.addListner("signal", (data) => {
        console.log("SIGNAL", JSON.stringify(data));
      });
    }
    return () => peer1.destroy();
  }, [peer1]);

  return <div> useWebRTC</div>;
};

export default useWebRTC;
