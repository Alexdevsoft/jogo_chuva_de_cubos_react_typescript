import React from 'react';
import { CUBE_SIZE, CUBE_COLORS } from '../constants';

interface Cube3DProps {
  x: number;
  y: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  onClick: () => void;
}

export const Cube3D: React.FC<Cube3DProps> = ({ x, y, rotX, rotY, rotZ, onClick }) => {
  const halfSize = CUBE_SIZE / 2;

  const faceStyle: React.CSSProperties = {
    position: 'absolute',
    width: `${CUBE_SIZE}px`,
    height: `${CUBE_SIZE}px`,
    border: '2px solid rgba(0,0,0,0.2)',
    boxSizing: 'border-box',
    opacity: 0.9,
    backfaceVisibility: 'hidden',
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: `${CUBE_SIZE}px`,
        height: `${CUBE_SIZE}px`,
        transformStyle: 'preserve-3d',
        transform: `translate3d(${x}px, ${y}px, 0) rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg)`,
        cursor: 'pointer',
        userSelect: 'none',
      }}
    >
      <div style={{ ...faceStyle, backgroundColor: CUBE_COLORS.front, transform: `rotateY(0deg) translateZ(${halfSize}px)` }} />
      <div style={{ ...faceStyle, backgroundColor: CUBE_COLORS.back, transform: `rotateY(180deg) translateZ(${halfSize}px)` }} />
      <div style={{ ...faceStyle, backgroundColor: CUBE_COLORS.right, transform: `rotateY(90deg) translateZ(${halfSize}px)` }} />
      <div style={{ ...faceStyle, backgroundColor: CUBE_COLORS.left, transform: `rotateY(-90deg) translateZ(${halfSize}px)` }} />
      <div style={{ ...faceStyle, backgroundColor: CUBE_COLORS.top, transform: `rotateX(90deg) translateZ(${halfSize}px)` }} />
      <div style={{ ...faceStyle, backgroundColor: CUBE_COLORS.bottom, transform: `rotateX(-90deg) translateZ(${halfSize}px)` }} />
    </div>
  );
};