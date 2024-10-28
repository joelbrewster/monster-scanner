import React, { useState, useEffect } from "react";
import { GlobalStyle } from "../styles/GlobalStyles";
import { StyledButton } from "../components/StyledButton";
import { RadarWrapper } from "../components/RadarWrapper";
import { Radar } from "../components/Radar";

const pageStyles = {
  textAlign: "center",
  padding: 0,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
  color: "#00ff33",
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
            <div style={{...contentStyle, fontSize: "4rem"}}>No monsters found, everything is safe</div>
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

export const Head = () => (
  <>
    <title>Monster Scanner</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta name="description" content="Scan your surroundings for monsters" />
    <meta name="theme-color" content="#111111" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    <meta name="apple-mobile-web-app-title" content="Monster Scanner" />
    
    <link rel="icon" type="image/png" sizes="192x192" href="/icons/icon-192x192.png" />
    <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
    <link rel="manifest" href="/manifest.json" />
  </>
);
