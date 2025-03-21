"use client";

import { useEffect, useRef, useState } from "react";

export default function FlowerGame() {
  const canvasRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [growthStage, setGrowthStage] = useState(0);
  const animationRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 400;
    canvas.height = 400;

    let lastTime = 0;
    const animate = (time) => {
      if (time - lastTime > 20) {
        drawFlower(ctx, growthStage, hovered);
        lastTime = time;
        if (growthStage < 100) {
          setGrowthStage((prev) => Math.min(prev + 0.5, 100));
        }
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [growthStage, hovered]);

  const drawFlower = (ctx, stage, isHovered) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const centerX = ctx.canvas.width / 2;
    const centerY = ctx.canvas.height / 2;

    const stemHeight = Math.min(150, stage * 1.5);
    const flowerSize = Math.min(60, stage * 0.6);
    const petalCount = 12;

    ctx.beginPath();
    ctx.moveTo(centerX, centerY + 100);
    ctx.lineTo(centerX, centerY + 100 - stemHeight);
    ctx.lineWidth = 5;
    ctx.strokeStyle = "#2F9E44";
    ctx.stroke();

    if (stage > 30) {
      ctx.beginPath();
      ctx.ellipse(
        centerX - 15,
        centerY + 100 - stemHeight * 0.6,
        20,
        10,
        Math.PI / 4,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = "#40C057";
      ctx.fill();

      ctx.beginPath();
      ctx.ellipse(
        centerX + 15,
        centerY + 100 - stemHeight * 0.7,
        20,
        10,
        -Math.PI / 4,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = "#40C057";
      ctx.fill();
    }

    if (stage > 50) {
      ctx.beginPath();
      ctx.arc(
        centerX,
        centerY + 100 - stemHeight,
        flowerSize * 0.4,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = "#E67700";
      ctx.fill();

      for (let i = 0; i < petalCount; i++) {
        const angle = (i / petalCount) * Math.PI * 2;
        const petalLength =
          flowerSize + (isHovered ? Math.sin(Date.now() / 100 + i) * 5 : 0);
        const petalX = centerX + Math.cos(angle) * petalLength;
        const petalY =
          centerY + 100 - stemHeight + Math.sin(angle) * petalLength;

        ctx.beginPath();
        ctx.ellipse(petalX, petalY, 15, 8, angle, 0, Math.PI * 2);
        ctx.fillStyle = "#FFD43B";
        ctx.fill();
      }
    }
  };

  const handleClick = () => {
    setGrowthStage((prev) => Math.min(prev + 10, 100));
  };

  return (
    <div className="flex flex-col justify-center min-h-screen bg-gradient-to-b from-sky-100 to-blue-50 p-4 text-center">
      <h1 className="text-2xl font-bold mb-4 text-amber-600 M-2xl">
        DIA DE FLORES AMARRILLAS
      </h1>
      <div className=" flex flex-col items-center">
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="border border-amber-200 rounded-lg bg-white shadow-lg cursor-pointer"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={handleClick}
        />
        <div className="mt-4 text-center text-gray-700">
          <p>NO SE QUE PONER XD </p>
        </div>
        <div className="mt-2 text-sm text-gray-500">BY FRITSH</div>
      </div>
    </div>
  );
}
