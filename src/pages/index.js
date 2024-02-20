import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

const pageStyles = {
  textAlign: "center",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
  backgroundColor: "#111", // Dark background color
  color: "#00ff33", // Green text color
  margin: 0, // Remove default margin
  minHeight: "100vh", // Minimum height of 100% viewport height
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100vw",
  fontSize: "120%", // Increase font size by 20%
  padding: "0",
};

const contentStyle = {
  fontSize: "2rem",
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
    opacity: 1;
  }
  to {
    transform: translate(${() => Math.random() * 100}vw, ${() =>
  Math.random() * 100}vh);
    opacity: 0;
  }
`;

const StyledButton = styled.button`
  background-color: #00ff33; /* Green background */
  color: #000; /* Green text color */
  border: 0.1rem solid #00ff33; /* Green border */
  font-size: 120%; /* Increase font size by 20% */
  padding: 8px 16px;
  margin: 40px 8px 8px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: transparent;
    color: #00ff33; /* Green on hover */
  }
`;

const StyledRadar = styled.div`
  margin: auto; /* Center the radar horizontally and vertically */
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
  transition: opacity 5s ease-in-out; /* Adjusted transition duration */

  .blip {
    content: " ";
    display: block;
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #00ff33; /* Same green color */
    animation: ${({ visible }) =>
      visible
        ? `${blipsAnimation} 5s linear`
        : "none"}; /* Adjusted animation */
    animation-fill-mode: forwards; /* Keep final animation state */
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
    let blipInterval;
    if (visible) {
      blipInterval = setInterval(() => {
        if (Math.random() < 0.1) {
          const newBlips = [...blips];
          newBlips.push({
            x: Math.random() * 100 + "vw",
            y: Math.random() * 100 + "vh",
          });
          setBlips(newBlips);
        }
      }, 100);
    }

    const removeBlipsTimeout = setTimeout(() => {
      clearInterval(blipInterval);
      setBlips([]);
    }, 1500);

    return () => {
      clearInterval(blipInterval);
      clearTimeout(removeBlipsTimeout);
    };
  }, [visible, blips]);

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
  const [hideScannerButton, setHideScannerButton] = useState(false);

  useEffect(() => {
    let timeout;
    if (scanning) {
      timeout = setTimeout(() => {
        setShowMessage(true);
        setHideScannerButton(false);
      }, 20000); // 20 seconds
    }
    return () => clearTimeout(timeout);
  }, [scanning]);

  const startScan = () => {
    setScanning(true);
    setShowMessage(false); // Reset message when starting scan
    setHideScannerButton(true); // Hide scanner button when starting scan
  };

  return (
    <main style={pageStyles}>
      {showMessage ? (
        <>
          <div style={contentStyle}>No monsters found, everything is safe</div>
          <StyledButton onClick={startScan}>Scan again</StyledButton>{" "}
          {/* Button to redo scan */}
        </>
      ) : (
        <>
          {!hideScannerButton && (
            <StyledButton onClick={startScan}>Monster scanner</StyledButton>
          )}
          {scanning && <Radar visible={scanning} />}
        </>
      )}
    </main>
  );
};

export default IndexPage;

export const Head = () => <title>Home Page</title>;
