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
import usersReducer from "../../features/users/usersSlice.js";
import moreSettingReducer from "../../features/moreSettings/moreSettingSlice.js";
import postReducer from "../../features/post/postSlice.js";
import messageReducer from "../../features/message/messageSlice.js";

//** REDUCERS */
//** USERS */
const userPersistConfig = {
  key: "user",
  storage: storage,
  whitelist:["theme","user","token","notifications"]
};
const usersPersistConfig = {
  key: "users",
  storage: storage,
  whitelist:["user"]
};
//** POSTS */
const postPersistConfig = {
  key: "post",
  storage: storage,
  whitelist:["userPosts"]
};
//** FORM */
const formPersistConfig = {
  key: "form",
  storage: storage,
  whitelist:[]
};
//** MORE SETTINGS */
const moreSettingPersistConfig = {
  key: "moreSetting",
  storage: storage,
  whitelist:[]
};
//** MESSAGE */
const messagePersistConfig = {
  key: "message",
  storage: storage,
  whitelist:["users"]
};
//** COMBINE REDUCERS */
const reducers = combineReducers({
  form: persistReducer(formPersistConfig,formReducer),
  user: persistReducer(userPersistConfig, userReducer),
  users: persistReducer(usersPersistConfig, usersReducer),
  message: persistReducer(messagePersistConfig, messageReducer),
  moreSetting: persistReducer(moreSettingPersistConfig, moreSettingReducer),
  post: persistReducer(postPersistConfig, postReducer),
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
