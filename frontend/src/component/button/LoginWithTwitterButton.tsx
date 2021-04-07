import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Icon } from "semantic-ui-react";
import { RootState } from "../../modules";
import { loginAsync } from "../../modules/auth";

const LoginWithTwitterButton = () => {
  const loadingLogin = useSelector(
    (state: RootState) => state.auth.loading.LOGIN,
  );
  const dispatch = useDispatch();

  const loginWithTwitter = useCallback(() => dispatch(loginAsync.request()), [
    dispatch,
  ]);

  return (
    <Button
      color="twitter"
      loading={loadingLogin}
      disabled={loadingLogin}
      onClick={loginWithTwitter}
    >
      <Icon name="twitter" /> Sign in with Twitter
    </Button>
  );
};

export default LoginWithTwitterButton;
