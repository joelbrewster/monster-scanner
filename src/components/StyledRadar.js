import styled from "styled-components";
import { radarBeamAnimation, blipsAnimation } from "../styles/animations";

export const StyledRadar = styled.div`
  background:
    radial-gradient(circle at center, rgba(32, 255, 77, 0.3) 0%, rgba(32, 255, 77, 0) 75%),
    repeating-radial-gradient(circle at center, rgba(32, 255, 77, 0) 5.8%, rgba(32, 255, 77, 0) 18%, rgba(32, 255, 77, 1) 18.6%, rgba(32, 255, 77, 0) 18.9%),
    linear-gradient(90deg, rgba(32, 255, 77, 0) 49.5%, rgba(32, 255, 77, 1) 50%, rgba(32, 255, 77, 1) 50%, rgba(32, 255, 77, 0) 50.2%),
    linear-gradient(0deg, rgba(32, 255, 77, 0) 49.5%, rgba(32, 255, 77, 1) 50%, rgba(32, 255, 77, 1) 50%, rgba(32, 255, 77, 0) 50.2%);
  width: 75vmin;
  height: 75vmin;
  position: relative;
  margin: 2rem auto;
  border-radius: 50%;
  border: 0.2rem solid #20ff4d;
  box-shadow: 0 0 2rem rgba(32, 255, 77, 0.3);
  overflow: hidden;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;

  &:before {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    animation: ${blipsAnimation} 5s infinite linear;
    animation-delay: 1.4s;
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
