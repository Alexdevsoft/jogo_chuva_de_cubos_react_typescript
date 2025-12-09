export interface CubeData {
  id: number;
  x: number;
  y: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  speedX: number;
  speedY: number;
  speedRotX: number;
  speedRotY: number;
}

export interface ParticleData {
  id: number;
  x: number;
  y: number;
  color: string;
  vx: number;
  vy: number;
  life: number; // 0 to 1
  size: number;
}

export enum GameState {
  PLAYING,
  WON,
}