import React, { useState, useEffect } from "react";
import styled, { keyframes, createGlobalStyle } from "styled-components";

// Styles
const pageStyles = {
  position: 'relative',
  textAlign: "center",
  padding: "2rem",
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
  color: "#00ff33",
  margin: 0,
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  fontSize: "120%"
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
  14% {
    background: radial-gradient(2vmin circle at 75% 70%, rgba(255, 255, 255, 1) 10%, rgba(32, 255, 77, 1) 30%, rgba(255, 255, 255, 0) 100%);
  }
  14.0002% {
    background: radial-gradient(2vmin circle at 75% 70%, rgba(255, 255, 255, 1) 10%, rgba(32, 255, 77, 1) 30%, rgba(255, 255, 255, 0) 100%),
               radial-gradient(2vmin circle at 63% 72%, rgba(255, 255, 255, 1) 10%, rgba(32, 255, 77, 1) 30%, rgba(255, 255, 255, 0) 100%);
  }
  25% {
    background: radial-gradient(2vmin circle at 75% 70%, rgba(255, 255, 255, 1) 10%, rgba(32, 255, 77, 1) 30%, rgba(255, 255, 255, 0) 100%),
               radial-gradient(2vmin circle at 63% 72%, rgba(255, 255, 255, 1) 10%, rgba(32, 255, 77, 1) 30%, rgba(255, 255, 255, 0) 100%),
               radial-gradient(2vmin circle at 56% 86%, rgba(255, 255, 255, 1) 10%, rgba(32, 255, 77, 1) 30%, rgba(255, 255, 255, 0) 100%);
  }
  26% {
    background: radial-gradient(2vmin circle at 75% 70%, rgba(255, 255, 255, 1) 10%, rgba(32, 255, 77, 1) 30%, rgba(255, 255, 255, 0) 100%),
               radial-gradient(2vmin circle at 63% 72%, rgba(255, 255, 255, 1) 10%, rgba(32, 255, 77, 1) 30%, rgba(255, 255, 255, 0) 100%),
               radial-gradient(2vmin circle at 56% 86%, rgba(255, 255, 255, 1) 10%, rgba(32, 255, 77, 1) 30%, rgba(255, 255, 255, 0) 100%);
    opacity: 1;
  }
  100% {
    background: radial-gradient(2vmin circle at 75% 70%, rgba(255, 255, 255, 1) 10%, rgba(32, 255, 77, 1) 30%, rgba(255, 255, 255, 0) 100%),
               radial-gradient(2vmin circle at 63% 72%, rgba(255, 255, 255, 1) 10%, rgba(32, 255, 77, 1) 30%, rgba(255, 255, 255, 0) 100%),
               radial-gradient(2vmin circle at 56% 86%, rgba(255, 255, 255, 1) 10%, rgba(32, 255, 77, 1) 30%, rgba(255, 255, 255, 0) 100%);
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
  background:
    radial-gradient(center, rgba(32, 255, 77, 0.3) 0%, rgba(32, 255, 77, 0) 75%),
    repeating-radial-gradient(rgba(32, 255, 77, 0) 5.8%, rgba(32, 255, 77, 0) 18%, rgba(32, 255, 77, 1) 18.6%, rgba(32, 255, 77, 0) 18.9%),
    linear-gradient(90deg, rgba(32, 255, 77, 0) 49.5%, rgba(32, 255, 77, 1) 50%, rgba(32, 255, 77, 1) 50%, rgba(32, 255, 77, 0) 50.2%),
    linear-gradient(0deg, rgba(32, 255, 77, 0) 49.5%, rgba(32, 255, 77, 1) 50%, rgba(32, 255, 77, 1) 50%, rgba(32, 255, 77, 0) 50.2%);
  width: 75vw;
  height: 75vw;
  max-height: 75vh;
  max-width: 75vh;
  position: relative;
  // left: 50%;
  // top: 50%;
  // transform: translate(-50%, -50%);
  border-radius: 50%;
  border: 0.2rem solid #20ff4d;
  overflow: hidden;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;

  &:before {
    content: ' ';
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    animation: ${blipsAnimation} 5s infinite linear;
    animation-delay: 1.4s;
  }

  &:after {
    content: ' ';
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

const RadarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  width: 100%;
  height: 100%;
  position: relative;
`;

// Add GlobalStyle
const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html {
    height: 100%;
    background-color: #111;
    font-size: 10px;
  }

  body {
    background-image:
      linear-gradient(0deg, transparent 24%, rgba(32, 255, 77, 0.15) 25%, rgba(32, 255, 77, 0.15) 26%, transparent 27%, transparent 74%, rgba(32, 255, 77, 0.15) 75%, rgba(32, 255, 77, 0.15) 76%, transparent 77%, transparent),
      linear-gradient(90deg, transparent 24%, rgba(32, 255, 77, 0.15) 25%, rgba(32, 255, 77, 0.15) 26%, transparent 27%, transparent 74%, rgba(32, 255, 77, 0.15) 75%, rgba(32, 255, 77, 0.15) 76%, transparent 77%, transparent);
    background-size: 7rem 7rem;
    background-position: -5.2rem -5.2rem;
    width: 100%;
    height: 100%;
    position: relative;
    padding: 0;
    margin: 0;
    font-size: 1.6rem;
  }
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
    <>
      <GlobalStyle />
      <main style={pageStyles}>
        {showMessage ? (
          <>
            <div style={contentStyle}><h2>No monsters found, everything is safe</h2></div>
            <StyledButton onClick={startScan}>Scan again</StyledButton>
          </>
        ) : (
          <>
            {!scanning && <StyledButton onClick={startScan}>Monster scanner</StyledButton>}
            {scanning && (
              <RadarWrapper>
                <StyledRadar visible={scanning} />
              </RadarWrapper>
            )}
          </>
        )}
      </main>
    </>
  );
};

export default IndexPage;

export const Head = () => <title>Home Page</title>;
