import { useEffect, useRef, useState } from "react";

import { Particle } from "./classes/Particle";
import { Vector } from "./classes/Vector";

const App = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const lastTimestampRef = useRef<number>(Date.now());

  const requestRef = useRef<number>(0);

  const [particles, setParticles] = useState<Particle[]>([
    new Particle(new Vector(100, 100), new Vector(0, 5), 20),
  ]);

  const handleCreateParticle = (e: any) => {
    const position = new Vector(e.clientX, e.clientY);
    const newParticle = new Particle(position, new Vector(0, 5), 20);

    setParticles((prev) => [...prev, newParticle]);
  };

  const animate = (timestamp: number) => {
    if (lastTimestampRef.current != undefined) {
      const deltaTime = timestamp - lastTimestampRef.current;

      const canvas = canvasRef.current;

      const ctx = canvas?.getContext("2d");
      if (!ctx) return;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      particles.forEach((particle) => {
        particle.draw(ctx);
      });
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
  }, [particles]);

  return (
    <div className="relative h-dvh max-h-dvh">
      {/* <div className="absolute right-6 top-6 flex flex-col gap-3 rounded-lg bg-white p-2">
        <div className="flex flex-col gap-1">
          <label className="text-xs">Gravitational acceleration [m/s]</label>
          <input
            type="text"
            placeholder="g"
            className="rounded-md border px-2"
            value={9.81}
          />
        </div>
        <button type="button" className="rounded-md border">
          Save
        </button>
      </div> */}
      <canvas
        className="bg-slate-900"
        ref={canvasRef}
        onClick={handleCreateParticle}
      />
    </div>
  );
};

export default App;
