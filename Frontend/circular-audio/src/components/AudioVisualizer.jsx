import { useEffect, useRef } from "react";

const AudioVisualizer = ({ audioData }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!audioData) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const baseRadius = 100;

    const drawVisualizer = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      audioData.forEach((value, index) => {
        const angle = (index / audioData.length) * Math.PI * 2;
        const length = value / 2;

        const startX = centerX + Math.cos(angle) * baseRadius;
        const startY = centerY + Math.sin(angle) * baseRadius;
        const endX = centerX + Math.cos(angle) * (baseRadius + length);
        const endY = centerY + Math.sin(angle) * (baseRadius + length);

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = "#00ffff";
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      requestAnimationFrame(drawVisualizer);
    };

    drawVisualizer();
  }, [audioData]);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={400}
      style={{ background: "#000", borderRadius: "50%" }}
    />
  );
};

export default AudioVisualizer;
