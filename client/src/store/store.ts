import { configureStore } from "@reduxjs/toolkit";
import auth from "./slices/auth.slice";

const store = configureStore({
  reducer: {
    auth,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
