import styled, { keyframes } from "styled-components";

export const SourceContainer = styled.span`
  font-size: ${(props) => props.theme.xsFont};
  margin: 0 0 0.1rem 0;
  &:hover {
    background: ${(props) => props.theme.sigGradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    cursor: pointer;
    transform: scale(1.06);
  }
`;

export const ModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #484848;
  padding: 1rem 1.5rem;
  width: 70vw;
  height: max-content;
  z-index: 1;
  border-radius: 0.5rem;
`;

export const SourcesContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 5rem;
`;

export const CloseButton = styled.button`
  position: absolute;
  right: 1rem;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.buttonBgColor};
  top: 1rem;
  &:hover {
    color: ${(props) => props.theme.white};
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const LoadingState = styled.div`
  position: absolute;
  left: 50%;
  top: 45%;
  border-top: 2px solid ${(props) => props.theme.white};
  border-radius: 50%;
  width: 10px;
  height: 10px;
  animation: ${rotate} 1.4s linear infinite;
`;

export const CheckboxContainer = styled.label`
  font-size: ${(props) => props.theme.xsFont};
  display: flex;
  align-items: center;
  input {
    margin: 1px 4px 0 0;
  }
`;
