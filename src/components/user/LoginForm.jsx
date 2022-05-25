import { useCallback } from "react";
import { useForm } from "react-hook-form";

//mui
import { styled, TextField, FormControl, Button } from "@mui/material";

//utils
import { getInputState } from "../../utils/getInputState";
import { required, validatePassword } from "../../utils/validators";
import { localStorageUsersKey } from "../../constants";

const Wrapper = styled("form")`
  width: 400px;
  height: auto;
  border: 1px solid #c1c2c3;
  padding: 0 1rem 1rem 1rem;
  border-radius: 4px;
`;

async function loginUser(values) {
  const users = JSON.parse(localStorage.getItem(localStorageUsersKey)) || [];
  const user = users.find((user) => {
    return user.email === values.email && user.password === values.password;
  });

  return Promise.resolve(user);
}

export const LoginForm = ({ className, setToken }) => {
  const { register, handleSubmit, formState } = useForm();
  const onSubmit = useCallback(
    async (values) => {
      const token = await loginUser(values);
      if (token) {
        setToken(token);
        alert("success " + token.email);
      } else {
        alert("User not found");
      }
    },
    [setToken]
  );

  return (
    <Wrapper className={className} onSubmit={handleSubmit(onSubmit)}>
      <h4>Login</h4>

      <FormControl sx={{ width: "100%", mb: 1 }}>
        <TextField
          label="e-mail"
          variant="outlined"
          type="email"
          {...register("email", { required: required() })}
          {...getInputState(formState, "email")}
        />
      </FormControl>

      <FormControl sx={{ width: "100%", mb: 1 }}>
        <TextField
          label="Пароль"
          variant="outlined"
          type="password"
          {...register("password", {
            required: required(),
            validate: validatePassword
          })}
          {...getInputState(formState, "password")}
        />
      </FormControl>

      <FormControl sx={{ width: "100%", mb: 1 }}>
        <Button type="submit" variant="outlined">
          Log in
        </Button>
      </FormControl>
    </Wrapper>
  );
};
