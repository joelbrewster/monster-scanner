import styled from "styled-components";

export const StyledButton = styled.button`
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
