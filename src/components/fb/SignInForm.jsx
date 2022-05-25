import { styled, TextField, FormControl, Button } from "@mui/material";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

//utils
import { getInputState } from "../../utils/getInputState";
import { required, validatePassword } from "../../utils/validators";

const Wrapper = styled("form")`
  width: 400px;
  height: auto;
  border: 1px solid #c1c2c3;
  padding: 0 1rem 1rem 1rem;
  border-radius: 4px;
`;

export const SignInForm = ({ className, onAuthSubmit }) => {
  const { register, handleSubmit, formState } = useForm();

  const onSubmit = async (values) => {
    onAuthSubmit(values);
  };

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
      <h4>
        Don't have an account?
        <Link to="/signup">Create one!</Link>
      </h4>
    </Wrapper>
  );
};

SignInForm.propTypes = {
  onAuthSubmit: PropTypes.func.isRequired
};
