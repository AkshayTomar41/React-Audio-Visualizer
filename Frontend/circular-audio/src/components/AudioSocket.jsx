import { useEffect, useRef } from "react";

const AudioSocket = ({ audioData }) => {
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = new WebSocket("ws://localhost:8081/ws/audio");

    socketRef.current.onopen = () => {
      console.log("WebSocket connected");
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    if (!audioData) return;

    if (
      socketRef.current &&
      socketRef.current.readyState === WebSocket.OPEN
    ) {
      socketRef.current.send(JSON.stringify(Array.from(audioData)));
    }
  }, [audioData]);

  return null;
};

export default AudioSocket;
