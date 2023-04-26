import { useState, useEffect, useRef, useMemo } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import useAuth from "./useAuth";

const useWebRTC = ({ interviewId }) => {
  const langData = useMemo(() => [
    { label: 'C', value: 'c' },
    { label: 'C++', value: 'cpp' },
    { label: 'Python', value: 'python' },
    { label: 'Java', value: 'java' },
    { label: 'Javascript', value: 'javascript' },
  ], [])
  const [socket, setSocket] = useState(io(process.env.REACT_APP_API_URL));
  const [socketIsConnected, setSocketIsConnected] = useState(socket.connected);
  const { user, token } = useSelector(state => state.auth);
  const { runCode } = useAuth();
  const [selectedLang, setSelectedLang] = useState(langData[0].value);


  const [userList, setUserList] = useState({});
  const [peer, setPeer] = useState(null);
  const [userStream, setUserStream] = useState(null);

  const [chats, setChats] = useState([]);
  const [editorValue, setEditorValue] = useState("");
  const [editorOutput, setEditorOutput] = useState("This is sample output");
  const [editorOutputLoading, setEditorOutputLoading] = useState(false);

  const compile = async () => {
    setEditorOutputLoading(true);
    const output = await runCode(editorValue, selectedLang);
    setEditorOutputLoading(false);
    setEditorOutput(output);
    peer.send(JSON.stringify({ type: "output", payload: output }));
  };

  const changeEditorLang = (lang) => {
    setSelectedLang(lang);
    peer.send(JSON.stringify({ type: "lang", payload: lang }));
  }

  const changeEditorValue = value => {
    setEditorValue(value);
    peer.send(JSON.stringify({ type: "editor", payload: value }));
  };

  const sendChat = (name, message) => {
    const newChats = [...chats, { name, message }];
    setChats(newChats);
    peer.send(JSON.stringify({
      type: "chat",
      payload: newChats
    }));
  };

  const videoRef = useRef();
  const editorRef = useRef();

  useEffect(() => {
    socket.on("connect", () => {
      setSocketIsConnected(socket.connected);
      console.log("socket connected")
      socket.emit("join-room", {
        roomId: interviewId,
        userId: user.key,
      })
    });
    socket.on("disconnect", () => {
      console.log("socket disconnected")
      setSocketIsConnected(socket.connected);
    });

    socket.on("connect-peer", ({ userList }) => {
      console.log("connect-peer", userList)
      setUserList(Object.keys(userList));
      const peer = new window.SimplePeer({
        initiator: user.role === "manager",
        trickle: false,
        config: {
          iceServers: [
            {
              urls: "stun:openrelay.metered.ca:80",
            },
            {
              urls: "turn:openrelay.metered.ca:80",
              username: "openrelayproject",
              credential: "openrelayproject",
            },
            {
              urls: "turn:openrelay.metered.ca:443",
              username: "openrelayproject",
              credential: "openrelayproject",
            },
            {
              urls: "turn:openrelay.metered.ca:443?transport=tcp",
              username: "openrelayproject",
              credential: "openrelayproject",
            },
          ],
        },
      });
      setPeer(peer);
    })

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("connect-peer");
    };
  }, [user, interviewId]);


  useEffect(() => {
    if (peer != null) {
      let otherUser;
      if (userList[0] === user.key) otherUser = userList[1];
      else otherUser = userList[0];
      peer.on("signal", (data) => {
        console.log(data)
        if (data.type == "offer") {
          console.log("sending offer from " + user.key + " to " + otherUser);
          socket.emit("offer", {
            roomId: interviewId,
            fromId: user.key,
            targetId: otherUser,
            data: data,
          });
        } else if (data.type == "answer") {
          console.log("sending answer from " + user.key + " to " + otherUser);
          socket.emit("answer", {
            roomId: interviewId,
            fromId: user.key,
            targetId: otherUser,
            data: data
          });
        }
      });
      peer.on("connect", () => {
        console.log("PEER FINALLY connected");
        navigator.mediaDevices
          .getUserMedia({ video: true, audio: false })
          .then((stream) => {
            peer.addStream(stream);
            setUserStream(stream);
          });

      });

      peer.on("data", (data) => {
        let jsondata = JSON.parse(data.toString());
        if (jsondata.type === "chat") {
          console.log(jsondata.payload, chats)
          if (jsondata.payload.length > chats.length) {
            setChats(jsondata.payload);
          }
        }
        if (jsondata.type === "editor") {
          if (jsondata.payload !== editorValue) {
            setEditorValue(jsondata.payload);
          }
        }
        if (jsondata.type === "output") {
          if (jsondata.payload !== editorOutput) {
            setEditorOutput(jsondata.payload);
          }
        }
        if (jsondata.type === "lang") {
          if (jsondata.payload !== selectedLang) {
            setSelectedLang(jsondata.payload);
          }
        }
      });

      peer.on("stream", (stream) => {
        console.log("stream received", stream);
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      });

      socket.on("offer", (data) => {
        console.log("received offer from " + data.fromId + " to " + user.key);
        peer.signal(data.data);
      });
      socket.on("answer", (data) => {
        console.log("received answer from " + data.fromId + " to " + user.key);
        peer.signal(data.data);
        console.log("answer signalled")
        console.log(peer);
      });
      return () => {
        socket.off("offer");
        socket.off("answer");
      }
    }
  }, [peer]);

  return {
    videoRef,
    chatHandler: { chats, sendChat },
    editorHandler: { value: editorValue, change: changeEditorValue, output: editorOutput, changeLang: changeEditorLang, lang: selectedLang, editorOutputLoading },
    compile,
    langData
  };
};

export default useWebRTC;
