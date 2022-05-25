import { useCallback } from "react";

//mui
import { styled } from "@mui/material";

//components
import { SignUpForm } from "../components/fb/SignUpForm";

//other
import { signUpUser } from "../fetchers/signUpUser";

const RegistrationFormStyled = styled(SignUpForm)`
  margin: auto;
`;
const Wrapper = styled("div")`
  display: flex;
  align-items: flex-start;
`;
export const SignUpPage = () => {
  const handleUserCreated = useCallback((user) => {
    signUpUser({ email: user.email, password: user.password })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  return (
    <Wrapper>
      <RegistrationFormStyled onUserCreated={handleUserCreated} />
    </Wrapper>
  );
};
