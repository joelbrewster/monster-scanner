import { keyframes } from "styled-components";

export const radarBeamAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const blipsAnimation = keyframes`
  0% {
    opacity: 0;
    background: none;
  }
  10% {
    opacity: 1;
    background: radial-gradient(2vmin circle at 35% 40%, rgba(255, 255, 255, 1) 10%, rgba(32, 255, 77, 1) 30%, rgba(255, 255, 255, 0) 100%);
  }
  30% {
    background: 
      radial-gradient(2vmin circle at 35% 40%, rgba(255, 255, 255, 1) 10%, rgba(32, 255, 77, 1) 30%, rgba(255, 255, 255, 0) 100%),
      radial-gradient(2vmin circle at 80% 65%, rgba(255, 255, 255, 1) 10%, rgba(32, 255, 77, 1) 30%, rgba(255, 255, 255, 0) 100%);
  }
  50% {
    background: 
      radial-gradient(2vmin circle at 35% 40%, rgba(255, 255, 255, 1) 10%, rgba(32, 255, 77, 1) 30%, rgba(255, 255, 255, 0) 100%),
      radial-gradient(2vmin circle at 80% 65%, rgba(255, 255, 255, 1) 10%, rgba(32, 255, 77, 1) 30%, rgba(255, 255, 255, 0) 100%),
      radial-gradient(2vmin circle at 25% 80%, rgba(255, 255, 255, 1) 10%, rgba(32, 255, 77, 1) 30%, rgba(255, 255, 255, 0) 100%);
  }
  70% {
    background: 
      radial-gradient(2vmin circle at 65% 25%, rgba(255, 255, 255, 1) 10%, rgba(32, 255, 77, 1) 30%, rgba(255, 255, 255, 0) 100%),
      radial-gradient(2vmin circle at 30% 70%, rgba(255, 255, 255, 1) 10%, rgba(32, 255, 77, 1) 30%, rgba(255, 255, 255, 0) 100%);
  }
  90% {
    opacity: 1;
    background: radial-gradient(2vmin circle at 75% 35%, rgba(255, 255, 255, 1) 10%, rgba(32, 255, 77, 1) 30%, rgba(255, 255, 255, 0) 100%);
  }
  100% {
    opacity: 0;
    background: none;
  }
`;
