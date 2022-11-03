import React from "react";
import { AiOutlineLogin, AiOutlineLogout } from "react-icons/ai";
import { AuthContainer, StyledButton } from "./AuthButtonStyles";
import { getAuthUrl } from "../../api/api";
import { useAuth } from "../../context/Auth/AuthContext";

type AuthButtonProps = {
  openUrlBrowser: (url: string) => void;
};

const AuthButton = (props: AuthButtonProps) => {
  const { authenticated, toggleAuthenticated } = useAuth();
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
      {authenticated === true ? (
        <StyledButton onClick={toggleAuthenticated}>
          <AiOutlineLogout />
        </StyledButton>
      ) : (
        <StyledButton onClick={() => openUrlBrowser(authUrl)}>
          <AiOutlineLogin />
        </StyledButton>
      )}
    </AuthContainer>
  );
};

export default AuthButton;
