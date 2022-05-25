import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

//mui
import { styled } from "@mui/material";

//components
import { SignInForm } from "../components/fb/SignInForm";
import { signInUser } from "../fetchers/signInUser";

//redux
import { setToken } from "../store/slice/auth";

const LoginFormStyled = styled(SignInForm)`
  margin: auto;
`;

export const SignInPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAuthSubmit = useCallback(
    (user) => {
      signInUser({ email: user.email, password: user.password })
        .then(({ idToken }) => {
          dispatch(setToken(idToken));
          navigate("/shop");
        })
        .catch((err) => {
          alert(err.message);
        });
    },
    [dispatch, navigate]
  );

  return (
    <div>
      <LoginFormStyled onAuthSubmit={handleAuthSubmit} />
    </div>
  );
};
