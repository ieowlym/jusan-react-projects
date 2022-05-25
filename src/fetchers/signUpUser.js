import axios from "axios";

export function signUpUser({ email, password }) {
  return axios
    .post(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCztXsvQrH4cYdjvUVYiOA9npTQ1mDG2d8",
      {
        returnSecureToken: true,
        email,
        password
      }
    )
    .then((res) => res.data)
    .catch((err) => {
      if (err.response.data.error.message === "EMAIL_EXISTS") {
        throw new Error("this email already exists");
      }
    });
}
