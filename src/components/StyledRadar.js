import styled, { keyframes } from "styled-components";
import { radarBeamAnimation } from "../styles/animations";
import { useEffect, useState } from "react";

// Helper function to generate random position
const getRandomPosition = () => {
  const x = Math.floor(Math.random() * 80 + 10); // 10-90%
  const y = Math.floor(Math.random() * 80 + 10); // 10-90%
  return `${x}% ${y}%`;
};

// Generate multiple random positions for each blip
const generateBlipPositions = () => {
  return {
    start: getRandomPosition(),
    middle: getRandomPosition(),
    end: getRandomPosition()
  };
};

// Generate 1-3 random blips with multiple positions
const generateBlips = () => {
  const count = Math.floor(Math.random() * 3) + 1; // 1-3 blips
  return Array.from({ length: count }, () => generateBlipPositions());
};

const createBlipAnimation = (blips) => keyframes`
  0% {
    opacity: 0;
    background: none;
  }
   20% {
    opacity: 1;
    background: ${blips.map(blip => 
      `radial-gradient(2vmin circle at ${blip.start}, rgba(255, 255, 255, 1) 10%, rgba(32, 255, 77, 1) 30%, rgba(255, 255, 255, 0) 100%)`
    ).join(',')};
  }
  40% {
    background: ${blips.map(blip => 
      `radial-gradient(2vmin circle at ${blip.middle}, rgba(255, 255, 255, 1) 10%, rgba(32, 255, 77, 1) 30%, rgba(255, 255, 255, 0) 100%)`
    ).join(',')};
  }
  60% {
    background: ${blips.map(blip => 
      `radial-gradient(2vmin circle at ${blip.end}, rgba(255, 255, 255, 1) 10%, rgba(32, 255, 77, 1) 30%, rgba(255, 255, 255, 0) 100%)`
    ).join(',')};
  }
  80% {
    opacity: 1;
    background: ${blips.map(blip => 
      `radial-gradient(2vmin circle at ${getRandomPosition()}, rgba(255, 255, 255, 1) 10%, rgba(32, 255, 77, 1) 30%, rgba(255, 255, 255, 0) 100%)`
    ).join(',')};
  }
  100% {
    opacity: 0;
    background: none;
  }
`;

export const Radar = ({ visible }) => {
  const [blips] = useState(() => generateBlips());
  const BlipAnimation = createBlipAnimation(blips);

  const StyledRadar = styled.div`
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
    opacity: ${visible ? 1 : 0};
    transition: opacity 0.5s ease-in-out;

    &:before {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      animation: ${BlipAnimation} 4s infinite;
      animation-timing-function: ease-in-out;
    }

    &:after {
      content: '';
      display: block;
      background-image: linear-gradient(44deg, rgba(32, 255, 77, 0) 50%, rgba(32, 255, 77, 1) 100%);
      width: 50%;
      height: 50%;
      position: absolute;
      top: 0;
      left: 0;
      animation: ${radarBeamAnimation} 5s infinite linear;
      transform-origin: bottom right;
      border-radius: 100% 0 0 0;
    }
  `;

  return <StyledRadar className="radar" />;
};
