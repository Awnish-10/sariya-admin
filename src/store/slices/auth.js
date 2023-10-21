import { createSlice } from "@reduxjs/toolkit";
// import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

// const initialUsers = () => {
//   const item = window.localStorage.getItem("users");
//   return item
//     ? JSON.parse(item)
//     : [];
// };
// save users in local storage

const initialIsAuth = () => {
  const item = window.localStorage.getItem("isAuth");
  return item ? JSON.parse(item) : false;
};
const initialJwt = () => {
  const item = window.localStorage.getItem("jwt");
  return item ? JSON.parse(item) : '';
};

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    // users: initialUsers(),
    isAuth: initialIsAuth(),
    jwt: initialJwt(),
  },
  reducers: {
    // handleRegister: (state, action) => {
    //   const { email, password } = action.payload;
    //   const user = state.users.find((user) => user.email === email);
    //   if (user) {
    //     toast.error("User already exists", {
    //       position: "top-right",
    //       autoClose: 1500,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //       theme: "light",
    //     });
    //   } else {
    //     state.users.push({
    //       // id: uuidv4(),
    //       name,
    //       email,
    //       password,
    //     });
    //     window.localStorage.setItem("users", JSON.stringify(state.users));
    //     toast.success("User registered successfully", {
    //       position: "top-right",
    //       autoClose: 1500,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //       theme: "light",
    //     });
    //   }
    // },

    handleLogin: (state, action) => {
      console.log("action",action);
      state.isAuth = true;
      state.jwt = action.payload;
      // save isAuth in local storage
      window.localStorage.setItem("isAuth", JSON.stringify(state.isAuth));
      window.localStorage.setItem("jwt", JSON.stringify( state.jwt));
      toast.success("User logged in successfully", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    },
    handleLogout: (state, action) => {
      state.isAuth = action.payload;
      // remove isAuth from local storage
      window.localStorage.removeItem("isAuth");
      toast.success("User logged out successfully", {
        position: "top-right",
      });
    },
  },
});

export const { handleRegister, handleLogin, handleLogout } = authSlice.actions;
export default authSlice.reducer;
