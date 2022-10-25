import {
  StyledButton,
  StyledHeader,
  ToolbarButtonsContainer,
  ToolbarContainer,
} from "./ToolbarStyles";

type ToolbarProps = {
  handleStop: () => void;
  getSources: () => void;
  handlePreview: () => void;
  handleDownload: () => void;
};

function Toolbar({
  handleStop,
  getSources,
  handlePreview,
  handleDownload,
}: ToolbarProps) {
  return (
    <ToolbarContainer>
      <StyledHeader>Scorder</StyledHeader>
      <h5>A simple, hassle-free screen recorder</h5>
      <ToolbarButtonsContainer>
        <StyledButton onClick={handleStop}>stop</StyledButton>
        <StyledButton onClick={getSources}>start</StyledButton>
        <StyledButton onClick={handlePreview}>preview</StyledButton>
        <StyledButton onClick={handleDownload}>download</StyledButton>
      </ToolbarButtonsContainer>
    </ToolbarContainer>
  );
}

export default Toolbar;
