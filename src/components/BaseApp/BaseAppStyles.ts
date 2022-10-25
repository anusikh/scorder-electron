import styled from "styled-components";

export const AppContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
  align-items: center;
`;

export const StyledVideo = styled.video`
  width: 80%;
  max-height: 100%;
  margin: 1rem;
`;
