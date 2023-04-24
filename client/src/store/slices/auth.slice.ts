import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../models/user.type";

interface IAuthState {
  user: IUser | Record<string, never>;
  isAuth: boolean;
}

const initialState: IAuthState = {
  user: {},
  isAuth: !!localStorage.getItem("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signUp: (state, { payload }) => {
      state.user = payload.user;
      localStorage.setItem("token", payload.accessToken);
      state.isAuth = true;
    },
    signIn: (state, { payload }) => {
      state.user = payload.user;
      localStorage.setItem("token", payload.accessToken);
      state.isAuth = true;
    },
    signOut: (state) => {
      localStorage.removeItem("token");
      state.user = {};
      state.isAuth = false;
    },
  },
});

export const actions = authSlice.actions;
export default authSlice.reducer;
