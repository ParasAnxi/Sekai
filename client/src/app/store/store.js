/** IMPORTS */
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
// import sessionStorage from "redux-persist/es/storage/session";
import formReducer from "../../features/form/formSlice.js";
import userReducer from "../../features/user/userSlice.js";

//** REDUCERS */
const userPersistConfig = {
  key: "user",
  storage: storage,
  whitelist:["theme","user","token"]
};
const formPersistConfig = {
  key: "form",
  storage: storage,
  whitelist:[]
};
const reducers = combineReducers({
  form: persistReducer(formPersistConfig,formReducer),
  user: persistReducer(userPersistConfig, userReducer),
});

//** CONFIG */
export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
});
