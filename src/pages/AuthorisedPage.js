import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { getUserData } from "../fetchers/getUserData";
import { setCurrentUser, setToken } from "../store/slice/auth";
import { CircularProgress } from "@mui/material";

export const AuthorisedPage = ({ children }) => {
  const { token, currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      getUserData(token)
        .then((data) => {
          dispatch(setCurrentUser(data.users[0]));
        })
        .catch((err) => {
          const y = confirm("token expired");
          if (y) {
            dispatch(setToken(null));
            dispatch(setCurrentUser(null));
          }
        });
    }
  }, [token, dispatch]);

  if (token && !currentUser) {
    return <CircularProgress />;
  }

  if (token && currentUser) {
    return children;
  }

  return <Navigate to="/login" />;
};
