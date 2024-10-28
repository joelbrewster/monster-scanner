import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

// Styles
const pageStyles = {
  textAlign: "center",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
  backgroundColor: "#111",
  color: "#00ff33",
  margin: 0,
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100vw",
  fontSize: "120%",
  padding: "0",
};

const contentStyle = {
  fontSize: "2rem",
};

// Keyframes
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
    opacity: 1;
  }
  to {
    transform: translate(${() => Math.random() * 100}vw, ${() =>
  Math.random() * 100}vh);
    opacity: 0;
  }
`;

// Styled components
const StyledButton = styled.button`
  background-color: #00ff33;
  color: #000;
  border: 0.1rem solid #00ff33;
  font-size: 120%;
  padding: 8px 16px;
  margin: 40px 8px 8px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: transparent;
    color: #00ff33;
  }
`;

const StyledRadar = styled.div`
  margin: auto;
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
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: opacity 5s ease-in-out;
  animation: ${radarBeamAnimation} 10s linear infinite; // Set animation duration to 10 seconds
`;

// Components
const Radar = ({ visible }) => {
  const [blips, setBlips] = useState([]);

  useEffect(() => {
    let blipInterval;
    if (visible) {
      blipInterval = setInterval(() => {
        if (blips.length < 5 && Math.random() < 0.1) {
          setBlips((prevBlips) => [
            ...prevBlips,
            {
              x: Math.random() * 100 + "vw",
              y: Math.random() * 100 + "vh",
            },
          ]);
        }
      }, 700);
    }

    const removeBlipsTimeout = setTimeout(() => {
      clearInterval(blipInterval);
      setBlips([]);
    }, 10000); // Set to 10000ms (10 seconds) to match the animation duration

    return () => {
      clearInterval(blipInterval);
      clearTimeout(removeBlipsTimeout);
    };
  }, [visible]);

  return (
    <StyledRadar className="radar" visible={visible}>
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
    setShowMessage(false);
  };

  useEffect(() => {
    let timeout;
    if (scanning) {
      // Generate random duration between 5000ms (5s) and 12000ms (12s)
      const randomDuration = Math.floor(Math.random() * (12000 - 5000 + 1) + 5000);
      
      timeout = setTimeout(() => {
        setScanning(false);
        setShowMessage(true);
      }, randomDuration);
    }
    return () => clearTimeout(timeout);
  }, [scanning]);

  return (
    <main style={pageStyles}>
      {showMessage ? (
        <>
          <div style={contentStyle}>No monsters found, everything is safe</div>
          <StyledButton onClick={startScan}>Scan again</StyledButton>
        </>
      ) : (
        <>
          {!scanning && <StyledButton onClick={startScan}>Monster scanner</StyledButton>}
          {scanning && <Radar visible={scanning} />}
        </>
      )}
    </main>
  );
};

export default IndexPage;

export const Head = () => <title>Home Page</title>;
