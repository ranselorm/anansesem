import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import userReducer from "./userSlice";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["user"],
  debug: true,
};

const persistedReducer = persistReducer(persistConfig, userReducer);

// Create Redux store
export const store = configureStore({
  reducer: {
    user: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"], // Avoid warnings for redux-persist actions
      },
    }),
});

// Create persistor for redux-persist
export const persistor = persistStore(store);

// Type definitions for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
