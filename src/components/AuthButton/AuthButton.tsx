import React from "react";
import { AiOutlineLogin, AiOutlineLogout } from "react-icons/ai";
import { AuthContainer, StyledButton } from "./AuthButtonStyles";
import { getAuthUrl } from "../../api/api";
import { AuthContext } from "../../context/Auth/AuthContext";

type AuthButtonProps = {
  openUrlBrowser: (url: string) => void;
};

const AuthButton = (props: AuthButtonProps) => {
  const { state, dispatch } = React.useContext(AuthContext);
  const { openUrlBrowser } = props;
  const [authUrl, setAuthUrl] = React.useState<string>("");
  const repeat = React.useRef<boolean>(false);

  React.useEffect(() => {
    if (repeat.current === false) {
      getAuthUrl()
        .then((res) => setAuthUrl(res?.data?.url))
        .catch((err) => console.log("Something went wrong: ", err));
    }
    repeat.current = true;
  }, []);

  return (
    <AuthContainer>
      {state.authenticated === true ? (
        <StyledButton onClick={() => dispatch({ type: "TOGGLE" })}>
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
