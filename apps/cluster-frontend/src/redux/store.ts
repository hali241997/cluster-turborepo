import { configureStore } from "@reduxjs/toolkit";
import clusterReducer from "./cluster/slice";

export const store = configureStore({
  reducer: {
    cluster: clusterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
