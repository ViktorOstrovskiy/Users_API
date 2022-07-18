import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
// reducer
import usersReducer from "./users-services/actions";

const rootReducer = combineReducers({
  users: usersReducer,
});

const persistConfig = {
  key: "state",
  storage: storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return [...getDefaultMiddleware({ serializableCheck: false }), thunk];
  },
});

export default store;
