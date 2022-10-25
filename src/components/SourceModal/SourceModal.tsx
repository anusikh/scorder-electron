import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import {
  CheckboxContainer,
  CloseButton,
  LoadingState,
  ModalContainer,
  SourceContainer,
  SourcesContainer,
} from "./SourceModalStyles";

type SourceModalProps = {
  openState: boolean;
  sources: any;
  handleSourceSelection: any;
  onClose: () => void;
  sourceLoading: boolean;
};

function SourceModal(props: SourceModalProps) {
  const { openState, sources, handleSourceSelection, onClose, sourceLoading } =
    props;
  const [aud, setAud] = React.useState<boolean>(false);
  return (
    <div>
      {openState === true ? (
        <ModalContainer>
          <CloseButton onClick={onClose}>
            <AiOutlineClose />
          </CloseButton>
          Sources
          <hr color="#aaaaa" />
          <SourcesContainer>
            {sourceLoading === false && sources ? (
              sources.map((s: any) => {
                return (
                  <SourceContainer
                    onClick={async () => await handleSourceSelection(s, aud)}
                    key={s.id}
                  >
                    {s.name}
                  </SourceContainer>
                );
              })
            ) : (
              <LoadingState></LoadingState>
            )}
          </SourcesContainer>
          <hr color="#aaaaa" />
          <CheckboxContainer>
            <input
              type={"checkbox"}
              checked={aud}
              onChange={() => setAud((prev) => !prev)}
            />
            audio
          </CheckboxContainer>
        </ModalContainer>
      ) : (
        <></>
      )}
    </div>
  );
}

export default SourceModal;
