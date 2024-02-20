import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

const pageStyles = {
  textAlign: "center",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
  backgroundColor: "#111", // Dark background color
  color: "#eee", // Light foreground color
};

const radarBeamAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const blipsAnimation = keyframes`
  from {
    transform: translate(0, 0);
  }
  to {
    transform: translate(${() => Math.random() * 100}vw, ${() =>
  Math.random() * 100}vh);
  }
`;

const StyledRadar = styled.div`
  background: -webkit-radial-gradient(
      center,
      rgba(0, 255, 51, 0.3) 0%,
      rgba(0, 255, 51, 0) 75%
    ),
    -webkit-repeating-radial-gradient(rgba(0, 255, 51, 0) 5.8%, rgba(
            0,
            255,
            51,
            0
          )
          18%, rgba(0, 255, 51, 1) 18.6%, rgba(0, 255, 51, 0) 18.9%),
    -webkit-linear-gradient(90deg, rgba(0, 255, 51, 0) 49.5%, rgba(
            0,
            255,
            51,
            1
          )
          50%, rgba(0, 255, 51, 1) 50%, rgba(0, 255, 51, 0) 50.2%),
    -webkit-linear-gradient(0deg, rgba(0, 255, 51, 0) 49.5%, rgba(0, 255, 51, 1)
          50%, rgba(0, 255, 51, 1) 50%, rgba(0, 255, 51, 0) 50.2%);
  width: 75vw;
  height: 75vw;
  max-height: 75vh;
  max-width: 75vh;
  border-radius: 50%;
  border: 0.2rem solid #00ff33;
  overflow: hidden;
  position: relative;

  .blip {
    content: " ";
    display: block;
    position: absolute;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: #00ff33; /* Same green color */
    animation: ${blipsAnimation} 10s infinite; /* Longer animation duration */
    animation-timing-function: linear;
    animation-delay: 1.4s; /* Delay added to start animation after radar beam */
    transform: translate(0, 0); /* Starting position */
  }

  &:after {
    content: " ";
    display: block;
    background-image: linear-gradient(
      44deg,
      rgba(0, 255, 51, 0) 50%,
      rgba(0, 255, 51, 1) 100%
    );
    width: 50%;
    height: 50%;
    position: absolute;
    top: 0;
    left: 0;
    animation: ${radarBeamAnimation} 5s infinite;
    animation-timing-function: linear;
    transform-origin: bottom right;
    border-radius: 100% 0 0 0;
  }
`;

const Radar = ({ visible }) => {
  const [blips, setBlips] = useState([]);

  useEffect(() => {
    if (visible) {
      const interval = setInterval(() => {
        if (Math.random() < 0.5) {
          const newBlips = [...blips];
          newBlips.push({
            x: Math.random() * 100 + "vw",
            y: Math.random() * 100 + "vh",
          });
          setBlips(newBlips);
        }
      }, 500);

      return () => clearInterval(interval);
    }
  }, [visible, blips]);

  return (
    <StyledRadar
      className="radar"
      style={{ display: visible ? "block" : "none" }}
    >
      {blips.map((blip, index) => (
        <div
          className="blip"
          key={index}
          style={{ left: blip.x, top: blip.y }}
        />
      ))}
    </StyledRadar>
  );
};

const IndexPage = () => {
  const [scanning, setScanning] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const startScan = () => {
    setScanning(true);
    setShowMessage(false); // Reset message when starting scan
    setTimeout(() => {
      setScanning(false);
      setShowMessage(true);
    }, 20000);
  };

  return (
    <main style={pageStyles}>
      {showMessage ? (
        <>
          <div>No monsters found, everything is safe</div>
          <button onClick={startScan}>Scan again</button>{" "}
          {/* Button to redo scan */}
        </>
      ) : (
        <>
          <button onClick={startScan}>Monster scanner</button>
          <Radar visible={scanning} />
        </>
      )}
    </main>
  );
};

export default IndexPage;

export const Head = () => <title>Home Page</title>;
