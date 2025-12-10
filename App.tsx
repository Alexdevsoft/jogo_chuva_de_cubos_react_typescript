import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Cube3D } from './components/Cube3D';
import { CUBE_SIZE, CUBE_COLORS, INITIAL_CUBE_COUNT, SPAWN_Y, SPEED_THRESHOLDS, WIN_SCORE } from './constants';
import { CubeData, ParticleData, GameState } from './types';

const randomRange = (min: number, max: number) => Math.random() * (max - min) + min;

export default function App() {
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<GameState>(GameState.PLAYING);

  const cubesRef = useRef<CubeData[]>([]);
  const particlesRef = useRef<ParticleData[]>([]);
  const requestRef = useRef<number>();
  const scoreRef = useRef(0);

  // Precisamos de uma variável de estado para acionar novas renderizações para que o usuário veja o movimento.
  const [, setTick] = useState(0);

  const initCubes = useCallback(() => {
    const newCubes: CubeData[] = [];
    const windowWidth = window.innerWidth;

    for (let i = 0; i < INITIAL_CUBE_COUNT; i++) {
      newCubes.push({
        id: Math.random(),
        x: randomRange(0, windowWidth - CUBE_SIZE),
        y: randomRange(SPAWN_Y, -CUBE_SIZE * 2),
        rotX: randomRange(0, 360),
        rotY: randomRange(0, 360),
        rotZ: randomRange(0, 360),
        speedX: 0,
        speedY: 0,
        speedRotX: randomRange(1, 3),
        speedRotY: randomRange(1, 3),
      });
    }
    cubesRef.current = newCubes;
  }, []);

  const resetGame = () => {
    setScore(0);
    scoreRef.current = 0;
    setGameState(GameState.PLAYING);
    cubesRef.current = [];
    particlesRef.current = [];
    initCubes();
  };

  useEffect(() => {
    initCubes();
  }, [initCubes]);

  const destroyCube = (cubeId: number) => {
    if (gameState === GameState.WON) return;

    const cubeIndex = cubesRef.current.findIndex(c => c.id === cubeId);
    if (cubeIndex === -1) return;

    const cube = cubesRef.current[cubeIndex];

    const colors = Object.values(CUBE_COLORS);
    const newParticles: ParticleData[] = [];

    const centerX = cube.x + CUBE_SIZE / 2;
    const centerY = cube.y + CUBE_SIZE / 2;

    for (let i = 0; i < 16; i++) {
      newParticles.push({
        id: Math.random(),
        x: centerX,
        y: centerY,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: randomRange(-10, 10),
        vy: randomRange(-10, 10),
        life: 1.0,
        size: randomRange(5, 15)
      });
    }

    particlesRef.current = [...particlesRef.current, ...newParticles];

    cube.y = SPAWN_Y;
    cube.x = randomRange(0, window.innerWidth - CUBE_SIZE);

    const newScore = scoreRef.current + 10; // +10 points per click to make 1000 achievable with ~100 clicks
    scoreRef.current = newScore;
    setScore(newScore);

    if (newScore >= WIN_SCORE) {
      setGameState(GameState.WON);
    }
  };

  // Game Loop
  const animate = useCallback(() => {
    if (gameState === GameState.WON) {

    } else {
      const windowHeight = window.innerHeight;
      const windowWidth = window.innerWidth;
      const currentScore = scoreRef.current;

      // Determinar a velocidade
      let currentSpeed = 2.5;

      for (let i = SPEED_THRESHOLDS.length - 1; i >= 0; i--) {
        if (currentScore >= SPEED_THRESHOLDS[i].score) {
          currentSpeed = SPEED_THRESHOLDS[i].speed;
          break;
        }
      }

      // Atualizar Cubos
      cubesRef.current.forEach(cube => {
        cube.y += currentSpeed;
        cube.rotX += cube.speedRotX;
        cube.rotY += cube.speedRotY;

        // Verificação de limites (parte inferior)
        if (cube.y > windowHeight) {
          cube.y = SPAWN_Y;
          cube.x = randomRange(0, windowWidth - CUBE_SIZE);
          cube.rotX = randomRange(0, 360);
          cube.rotY = randomRange(0, 360);
        }
      });

      // Atualizar Partículas
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.5;
        p.life -= 0.02;

        if (p.life <= 0) {
          particlesRef.current.splice(i, 1);
        }
      }
    }

    setTick(prev => prev + 1);

    requestRef.current = requestAnimationFrame(animate);
  }, [gameState]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [animate]);

  return (
    <div className="scene bg-slate-900 w-full h-screen relative overflow-hidden select-none">

      <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-white p-4 rounded-lg z-50 font-bold text-xl pointer-events-none">
        SCORE: {score}
      </div>

      {gameState !== GameState.WON && cubesRef.current.map(cube => (
        <Cube3D
          key={cube.id}
          {...cube}
          onClick={() => destroyCube(cube.id)}
        />
      ))}

      {particlesRef.current.map(p => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            opacity: p.life,
            transform: `scale(${p.life})`,
            pointerEvents: 'none',
          }}
        />
      ))}

      {gameState === GameState.WON && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-[100] bg-black/80">
          <h1 className="text-6xl md:text-8xl font-black text-green-500 text-center mb-8 drop-shadow-[0_0_15px_rgba(0,255,0,0.5)]">
            PARABÉNS, CAMPEÃO!
          </h1>
          <button
            onClick={resetGame}
            className="px-8 py-4 bg-white text-black font-bold text-2xl rounded-full hover:bg-gray-200 transition-transform transform hover:scale-105 active:scale-95 shadow-lg"
          >
            Jogar Novamente
          </button>
        </div>
      )}
    </div>
  );
}