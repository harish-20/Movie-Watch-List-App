import { configureStore } from "@reduxjs/toolkit";

import movieReducer from "./movieSlice";
import { useDispatch, useSelector } from "react-redux";

const store = configureStore({
  reducer: {
    movie: movieReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export default store;
