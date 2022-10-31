import React from "react";
import { AiOutlineLogin } from "react-icons/ai";
import { AuthContainer, StyledButton } from "./AuthButtonStyles";
import { getAuthUrl } from "../../api/api";

type AuthButtonProps = {
  openUrlBrowser: (url: string) => void;
};

const AuthButton = (props: AuthButtonProps) => {
  const { openUrlBrowser } = props;
  const [authUrl, setAuthUrl] = React.useState<string>("");
  const repeat = React.useRef<boolean>(false);

  React.useEffect(() => {
    if (repeat.current === false) {
      getAuthUrl()
        .then((res) => setAuthUrl(res?.data?.url))
        .catch();
    }
    repeat.current = true;
  }, []);

  return (
    <AuthContainer>
      <StyledButton onClick={() => openUrlBrowser(authUrl)}>
        <AiOutlineLogin />
      </StyledButton>
    </AuthContainer>
  );
};

export default AuthButton;
