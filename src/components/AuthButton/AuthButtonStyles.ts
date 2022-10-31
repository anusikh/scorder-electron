import styled from "styled-components";

export const StyledButton = styled.button`
  margin: 0.5rem;
  width: 2rem;
  height: 2rem;
  border-radius: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.buttonBgColor};
  font-size: ${(props) => props.theme.xsFont};
  font-weight: 700;
  &:hover {
    background: ${(props) => props.theme.sigGradient};
  }
`;

export const AuthContainer = styled.div`
  position: absolute;
  right: 0;
`;
