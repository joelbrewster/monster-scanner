import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html {
    height: 100%;
    font-size: 10px;
  }

  body {
    background-image:
      linear-gradient(0deg, transparent 24%, rgba(32, 255, 77, 0.15) 25%, rgba(32, 255, 77, 0.15) 26%, transparent 27%, transparent 74%, rgba(32, 255, 77, 0.15) 75%, rgba(32, 255, 77, 0.15) 76%, transparent 77%, transparent),
      linear-gradient(90deg, transparent 24%, rgba(32, 255, 77, 0.15) 25%, rgba(32, 255, 77, 0.15) 26%, transparent 27%, transparent 74%, rgba(32, 255, 77, 0.15) 75%, rgba(32, 255, 77, 0.15) 76%, transparent 77%, transparent);
    background-size: 7rem 7rem;
    background-position: -5.2rem -5.2rem;
    background-color: #111111;
    width: 100%;
    height: 100%;
    position: relative;
    padding: 0;
    margin: 0;
    font-size: 1.6rem;
  }
`;
