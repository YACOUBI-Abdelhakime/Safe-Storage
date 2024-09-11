import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userSlice from "./user/userSlice.js";
import globalSlice from "./global/globalSlice.js";

// Redux-persist configuration for user reducer
const persistConfigUserReducer = {
  key: "userReducer",
  storage,
};

// Redux-persist configuration for global reducer
const persistConfigGlobalReducer = {
  key: "globalReducer",
  storage,
};

const rootReducer = {
  userReducer: persistReducer(persistConfigUserReducer, userSlice),
  globalReducer: persistReducer(persistConfigGlobalReducer, globalSlice),
};

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

const persistor = persistStore(store);

export { persistor, store };

// export default store dispatch
export type AppDispatch = typeof store.dispatch;
