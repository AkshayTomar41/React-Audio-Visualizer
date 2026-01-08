import { useEffect, useRef } from "react";

const useAudio = (setAudioData, isOn) => {
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    if (!isOn) {
      // Mic OFF: stop all tracks and close context
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }

      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }

      setAudioData(null);
      return;
    }

    // Mic ON: initialize audio context
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      streamRef.current = stream;

      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaStreamSource(stream);

      source.connect(analyser);
      analyser.fftSize = 256;

      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
      sourceRef.current = source;

      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const updateAudio = () => {
        if (!analyserRef.current) return;
        analyser.getByteFrequencyData(dataArray);
        setAudioData(dataArray);
        requestAnimationFrame(updateAudio);
      };

      updateAudio();
    });

  }, [isOn, setAudioData]);
};

export default useAudio;
