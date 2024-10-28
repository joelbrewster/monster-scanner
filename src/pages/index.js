import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { GlobalStyle } from "../styles/GlobalStyles";
import { StyledButton } from "../components/StyledButton";
import { RadarWrapper } from "../components/RadarWrapper";
import { Radar } from "../components/Radar"; // Changed to named import

const pageStyles = {
  textAlign: "center",
  padding: 0,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
  color: "#00ff33",
  backgroundColor: "#000",
  margin: 0,
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100vw",
  fontSize: "120%",
};

const contentStyle = {
  fontSize: "2rem",
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
            <div style={contentStyle}>No monsters found, everything is safe</div>
            <StyledButton onClick={startScan}>Scan again</StyledButton>
          </>
        ) : (
          <>
            {!scanning && <StyledButton onClick={startScan}>Monster scanner</StyledButton>}
            {scanning && (
              <RadarWrapper>
                <Radar visible={scanning} />
              </RadarWrapper>
            )}
          </>
        )}
      </main>
    </>
  );
};

export default IndexPage;

export const Head = () => <title>Monster Scanner</title>;
