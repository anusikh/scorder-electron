import styled from "styled-components";

export const ToolbarContainer = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ToolbarButtonsContainer = styled.div`
  display: flex;
  @media only screen and (max-width: 500px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  @media only screen and (max-width: 260px) {
    display: flex;
    flex-direction: column;
  }
`;

export const StyledButton = styled.button`
  margin: 0.5rem;
  width: 6rem;
  height: 2rem;
  border-radius: 30px;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.buttonBgColor};
  font-size: ${(props) => props.theme.xsFont};
  font-weight: 700;
  &:hover {
    background: ${(props) => props.theme.sigGradient};
  }
`;

export const StyledHeader = styled.div`
  background: ${(props) => props.theme.sigGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 600;
  font-size: ${(props) => props.theme.xlFont};
`;
