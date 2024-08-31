import { useCallback, useEffect, useRef, useState } from "react";

import type { TParticle, TPosition } from "../types/particle.types";

export type TParticleProps = {
  particle: TParticle;
};

const Particle = ({ particle }: TParticleProps) => {
  const { position } = particle;

  const ref = useRef<HTMLDivElement>(null);

  const [particlePosition, setParticlePosition] = useState<TPosition>(position);

  const gravity = 9.81;

  const velocity = useRef<number>(100);

  const lastTimestamp = useRef<number>(Date.now() / 1000);

  const calcVelocity = (dT: number) => {
    const v = velocity.current + gravity * dT;
    velocity.current = v;
    return v;
  };

  const calcY = useCallback(
    (dT: number) => {
      const v = calcVelocity(dT);
      return v * dT + particlePosition.y - (gravity * Math.pow(dT, 2)) / 2;
    },
    [particlePosition],
  );

  const tick = useCallback(() => {
    const now = Date.now() / 1000;

    const deltaTime = now - lastTimestamp.current;

    lastTimestamp.current = now;

    if (particlePosition.y + 40 < window.innerHeight) {
      setParticlePosition((prev) => ({
        ...prev,
        y: calcY(deltaTime),
      }));
    }
  }, [calcY, particlePosition]);

  useEffect(() => {
    tick();
  }, [tick]);

  return (
    <div
      ref={ref}
      className="absolute h-10 w-10 rounded-full bg-yellow-600"
      style={{
        top: particlePosition.y,
        left: particlePosition.x,
      }}
      onClick={tick}
    />
  );
};

export default Particle;
