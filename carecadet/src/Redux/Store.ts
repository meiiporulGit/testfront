import { configureStore } from "@reduxjs/toolkit";

import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import {loginReducer} from "./ProviderRedux/LoginSlice";
import { facilityReducer } from "./ProviderRedux/facilitySlice";
import {organizationReducer} from "./ProviderRedux/orgSlice";
import { serviceReducer } from "./ProviderRedux/serviceSlice";
import { patientLoginReducer } from "./PatientRedux/patientAuth";
import { serviceViewReducer } from "./ProviderRedux/serviceViewSlice";
import { homeReducer } from "./ProviderRedux/HomeSlice";
import { adminLoginReducer } from "./Admin/adminLogin";


const reducers = combineReducers({
  adminAuth:adminLoginReducer,
  homeReducer:homeReducer,
  providerAuth: loginReducer,
  providerOrganization: organizationReducer,
  providerFacility: facilityReducer,
  providerService: serviceReducer,
  providerServiceView:serviceViewReducer,
  patientAuth:patientLoginReducer

});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);
// ...

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST, REGISTER],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
