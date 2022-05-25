import { useCallback, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

//mui
import { IconButton, styled } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

//components
import { RegistrationForm } from "./RegistrationForm";
import { LoginForm } from "./LoginForm";

//utils
import { localStorageUsersKey } from "../../constants";

const RegistrationFormStyled = styled(RegistrationForm)`
  margin: 0 2rem 1rem 1rem;
`;
const LoginFormStyled = styled(LoginForm)`
  margin: 0 2rem 1rem 1rem;
`;
const Wrapper = styled("div")`
  display: flex;
`;
const List = styled("div")`
  display: flex;
  flex-wrap: wrap;

  & > div {
    margin: 0.5rem;
    border: 1px solid #aaa;
    padding: 8px;
    display: flex;
  }
`;
export const UsersModule = () => {
  const { control } = useForm({
    defaultValues: {
      users: JSON.parse(localStorage.getItem(localStorageUsersKey)) || []
    }
  });
  const { fields: users, append, remove } = useFieldArray({
    control,
    name: "users"
  });

  const [token, setToken] = useState();
  console.log(token);

  useEffect(() => {
    localStorage.setItem(localStorageUsersKey, JSON.stringify(users));
  }, [users]);

  const checkDoubleUser = useCallback(
    (values) => {
      if (users.find((user) => user.email === values.email)) {
        alert("user exist");
      } else {
        append(values);
      }
    },
    [users, append]
  );

  return (
    <Wrapper>
      <div>
        <LoginFormStyled setToken={setToken} />
        <RegistrationFormStyled onUserCreated={checkDoubleUser} users={users} />
      </div>
      <div>
        <h4>Users</h4>
        <List>
          {users.map((user, index) => (
            <div>
              <span>
                {user.email}
                <IconButton aria-label="delete" onClick={() => remove(index)}>
                  <DeleteIcon />
                </IconButton>
              </span>
            </div>
          ))}
        </List>
      </div>
    </Wrapper>
  );
};
