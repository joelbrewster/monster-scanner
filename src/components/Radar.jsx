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
  5% { opacity: 0; }
  15% { opacity: 0.3; }
  25% { opacity: 0.6; }
  35% { opacity: 0.8; }
  45% { opacity: 0.6; }
  55% { opacity: 0.3; }
  65% { opacity: 0.1; }
  75%, 100% { opacity: 0; }
`; // Much longer, smoother fade

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
  width: 2.5vmin;
  height: 2.5vmin;
  background: radial-gradient(circle at center, 
    rgba(255, 255, 255, 0.6) 5%, 
    rgba(32, 255, 77, 0.6) 20%, 
    rgba(32, 255, 77, 0.2) 40%,
    rgba(32, 255, 77, 0) 60%
  );
  border-radius: 50%;
  left: ${({ x }) => x}%;
  top: ${({ y }) => y}%;
  animation: ${fadeInOut} 24s ease-in-out;
  pointer-events: none;
`;

export const Radar = ({ visible }) => {
  const [blip, setBlip] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const tryCreateBlip = () => {
      if (isAnimating) return; // Don't create new blip if one is animating
      
      if (Math.random() <= 0.03) { // 3% chance to create a blip
        setIsAnimating(true);
        setBlip({
          id: Date.now(),
          x: Math.random() * 80 + 10,
          y: Math.random() * 80 + 10
        });
        
        // Clear blip after animation completes
        setTimeout(() => {
          setBlip(null);
          setIsAnimating(false);
        }, 24000); // Match animation duration
      }
    };

    // Initial delay
    const startDelay = setTimeout(() => {
      tryCreateBlip();
    }, Math.random() * 10000);

    // Regular checks
    const interval = setInterval(tryCreateBlip, 30000);

    return () => {
      clearTimeout(startDelay);
      clearInterval(interval);
    };
  }, [isAnimating]);

  return (
    <RadarBase visible={visible}>
      <RadarBeam />
      {blip && <Blip key={blip.id} x={blip.x} y={blip.y} />}
    </RadarBase>
  );
};

export default Radar;
