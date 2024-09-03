import { MouseEventHandler, useEffect, useRef } from "react";

import { Particle } from "./classes/Particle";
import { Vector } from "./classes/Vector";
import { ParticlesSystem } from "./classes/ParticlesSystem";

const App = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const lastTimestampRef = useRef<number>(Date.now());

  const requestRef = useRef<number>(0);

  const ps = new ParticlesSystem();

  const isDragging = useRef<boolean>(false);

  const mouseHoldIntervalIdRef = useRef<number>(0);

  const random = (min: number, max: number): number => {
    return parseFloat((Math.random() * (max - min) + min).toFixed(4));
  };

  const handleAddParticle = (e: any) => {
    const position = new Vector(e.clientX, e.clientY);
    const newParticle = new Particle(
      position,
      new Vector(random(-1, 1), random(1, 0)),
      new Vector(0, 0.5),
      10,
    );
    ps.addParticle(newParticle);
  };

  const startAddingParticles = (e: MouseEventHandler<HTMLCanvasElement>) => {
    handleAddParticle(e);
    mouseHoldIntervalIdRef.current = window.setInterval(() => {
      handleAddParticle(e);
    }, 1);
  };

  const onMouseDown = (e: MouseEventHandler<HTMLCanvasElement>) => {
    isDragging.current = true;
    startAddingParticles(e);
  };

  const onMouseMove = (e: MouseEventHandler<HTMLCanvasElement>) => {
    if (isDragging.current) {
      clearInterval(mouseHoldIntervalIdRef.current);
      startAddingParticles(e);
    }
  };

  const onMouseUp = () => {
    isDragging.current = false;
    clearInterval(mouseHoldIntervalIdRef.current);
  };

  const animate = (timestamp: number) => {
    if (lastTimestampRef.current != undefined) {
      // const deltaTime = timestamp - lastTimestampRef.current;

      const canvas = canvasRef.current;

      const ctx = canvas?.getContext("2d");

      if (!ctx) return;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ps.run(ctx);
    }

    lastTimestampRef.current = timestamp;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = innerHeight;
    }
  }, []);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);

    // eslint-disable-next-line
  }, []);

  return (
    <div className="relative h-dvh max-h-dvh">
      <canvas
        className="bg-slate-900"
        ref={canvasRef}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        onMouseDown={onMouseDown}
      />
    </div>
  );
};

export default App;
