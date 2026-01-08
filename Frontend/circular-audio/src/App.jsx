import { useState } from "react";
import useAudio from "./components/useAudio";
import AudioVisualizer from "./components/AudioVisualizer";
import AudioSocket from "./components/AudioSocket";

function App() {
  const [audioData, setAudioData] = useState(null);
  const [isOn, setIsOn] = useState(true);

  useAudio(setAudioData, isOn);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "grid",
        placeItems: "center",
        textAlign: "center"
      }}
    >
      <div>
        <h2 style={{ marginBottom: "20px" }}>
          Circular Audio Visualizer
        </h2>

        <AudioVisualizer audioData={audioData} />

        <button
          onClick={() => setIsOn(prev => !prev)}
          style={{
            marginTop: "20px",
            padding: "10px 22px",
            borderRadius: "999px",
            border: "none",
            cursor: "pointer",
            fontSize: "15px",
            backgroundColor: isOn ? "#22c55e" : "#ef4444",
            color: "white"
          }}
        >
          {isOn ? "Mic ON" : "Mic OFF"}
        </button>

        <AudioSocket audioData={audioData} />
      </div>
    </div>
  );
}

export default App;
