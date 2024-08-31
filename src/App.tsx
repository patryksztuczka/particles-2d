import { useState } from "react";

import Particle from "./components/particle";
import { TParticle } from "./types/particle.types";

const App = () => {
  const [particles, setParticles] = useState<TParticle[]>([]);

  const handleAddParticle = (e: any) => {
    const newParticle: TParticle = {
      position: {
        x: e.clientX,
        y: e.clientY,
      },
    };

    setParticles((prev) => [...prev, newParticle]);
  };

  return (
    <div
      className="relative h-dvh max-h-dvh bg-slate-900"
      onClick={handleAddParticle}
    >
      <div className="absolute right-6 top-6 flex flex-col gap-3 rounded-lg bg-white p-2">
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
      </div>
      {particles.map((particle) => (
        <Particle particle={particle} />
      ))}
    </div>
  );
};

export default App;
