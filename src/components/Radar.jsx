import React, { useState, useEffect } from 'react';
import styled, { keyframes } from "styled-components";

// Animations
const radarBeamAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const fadeInOut = keyframes`
  0%, 100% { opacity: 0; }
  25%, 75% { opacity: 1; }
`;

// Styled Components
const RadarBase = styled.div`
  background:
    radial-gradient(circle at center, rgba(32, 255, 77, 0.3) 0%, rgba(32, 255, 77, 0) 75%),
    repeating-radial-gradient(circle at center, rgba(32, 255, 77, 0) 5.8%, rgba(32, 255, 77, 0) 18%, rgba(32, 255, 77, 1) 18.6%, rgba(32, 255, 77, 0) 18.9%),
    linear-gradient(90deg, rgba(32, 255, 77, 0) 49.5%, rgba(32, 255, 77, 1) 50%, rgba(32, 255, 77, 1) 50%, rgba(32, 255, 77, 0) 50.2%),
    linear-gradient(0deg, rgba(32, 255, 77, 0) 49.5%, rgba(32, 255, 77, 1) 50%, rgba(32, 255, 77, 1) 50%, rgba(32, 255, 77, 0) 50.2%);
  width: 60vmin;
  height: 60vmin;
  position: relative;
  border-radius: 50%;
  border: 0.2rem solid #20ff4d;
  box-shadow: 0 0 2rem rgba(32, 255, 77, 0.3);
  overflow: hidden;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
`;

const RadarBeam = styled.div`
  position: absolute;
  width: 50%;
  height: 50%;
  top: 0;
  left: 0;
  background-image: linear-gradient(44deg, rgba(32, 255, 77, 0) 50%, rgba(32, 255, 77, 1) 100%);
  animation: ${radarBeamAnimation} 5s infinite linear;
  transform-origin: bottom right;
  border-radius: 100% 0 0 0;
`;

const Blip = styled.div`
  position: absolute;
  width: 2vmin;
  height: 2vmin;
  background: radial-gradient(circle at center, rgba(255, 255, 255, 1) 10%, rgba(32, 255, 77, 1) 30%, rgba(255, 255, 255, 0) 100%);
  border-radius: 50%;
  left: ${({ x }) => x}%;
  top: ${({ y }) => y}%;
  animation: ${fadeInOut} 2s ease-in-out infinite;
  animation-delay: ${({ delay }) => delay}s;
`;

export const Radar = ({ visible }) => {
  const [blips, setBlips] = useState([]);

  useEffect(() => {
    const createBlips = () => {
      const numBlips = Math.floor(Math.random() * 3) + 1; // 1-3 blips
      return Array.from({ length: numBlips }, () => ({
        id: Math.random(),
        x: Math.random() * 80 + 10, // 10-90%
        y: Math.random() * 80 + 10, // 10-90%
        delay: Math.random() * 2 // Random delay 0-2s
      }));
    };

    const interval = setInterval(() => {
      setBlips(createBlips());
    }, 2000);

    setBlips(createBlips()); // Initial blips

    return () => clearInterval(interval);
  }, []);

  return (
    <RadarBase visible={visible}>
      <RadarBeam />
      {blips.map((blip) => (
        <Blip
          key={blip.id}
          x={blip.x}
          y={blip.y}
          delay={blip.delay}
        />
      ))}
    </RadarBase>
  );
};

export default Radar;
