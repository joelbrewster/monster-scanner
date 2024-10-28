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

export const Head = () => (
  <>
    <title>Monster Scanner</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    <meta name="apple-mobile-web-app-title" content="Monster Scanner" />
    <meta name="application-name" content="Monster Scanner" />
    <meta name="description" content="Scan your surroundings for monsters" />
    <meta name="theme-color" content="#111111" />
    
    {/* iOS icon links */}
    <link rel="apple-touch-icon" href="/icons/icon-180.png" />
    <link rel="apple-touch-icon" sizes="152x152" href="/icons/icon-152.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-180.png" />
    <link rel="apple-touch-icon" sizes="167x167" href="/icons/icon-167.png" />
    
    {/* Splash screen images */}
    <link rel="apple-touch-startup-image" href="/splash/splash-2048x2732.png" media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)" />
    <link rel="apple-touch-startup-image" href="/splash/splash-1668x2224.png" media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)" />
    <link rel="apple-touch-startup-image" href="/splash/splash-1536x2048.png" media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)" />
    <link rel="apple-touch-startup-image" href="/splash/splash-1125x2436.png" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)" />
    <link rel="apple-touch-startup-image" href="/splash/splash-1242x2208.png" media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3)" />
    <link rel="apple-touch-startup-image" href="/splash/splash-750x1334.png" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)" />
    <link rel="apple-touch-startup-image" href="/splash/splash-640x1136.png" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)" />
    
    {/* Web manifest */}
    <link rel="manifest" href="/manifest.json" />
  </>
);
