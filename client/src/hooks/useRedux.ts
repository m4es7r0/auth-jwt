import { useMemo } from "react";

import { bindActionCreators } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { actions } from "../store/slices/auth.slice";
import type { AppDispatch, RootState } from "../store/store";

const rootActions = {
  ...actions,
};

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAppActions = () => {
  const dispatch = useAppDispatch();
  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
};
