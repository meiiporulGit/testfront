import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../Store";

import Cookies from "js-cookie";

// Define a type for the slice state
interface CounterState {
  login: any;
  pageUser: string;
  providerLogoutButton: boolean;
  editOptions: boolean;
  tabValue: number;
}

// Define the initial state using that type
const initialState: CounterState = {
  login: {},
  pageUser: "PATIENT",
  providerLogoutButton: false,
  editOptions: false,
  tabValue: 0,
};

export const loginSlice = createSlice({
  name: "login",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    refresh: (state) => {
      const userToken = Cookies.get("token");
      const userPage = localStorage.getItem("pageUserType");
      let token = "";
      let pageType = "";
      if (typeof userToken === "string") {
        token = JSON.parse(userToken); // ok
        console.log(token);
      }
      if (typeof userPage === "string") {
        pageType = userPage; // ok
        console.log(pageType);
      }
      if (token !== null || undefined) {
        return {
          ...state,
          login: token,
          pageUser: pageType,
        };
      }
    },
    pageUser: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        pageUser: action.payload,
      };
    },
    storeLoginInfo: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        login: action.payload,
      };
    },
    storeLoginInfoupdate: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        login: {...state.login,["firstName"]:action.payload.firstName,
        ["lastName"]:action.payload.lastName},
      };
    },
    
    logoutButton: (state) => {
      return {
        ...state,
        login: {},
        providerLogoutButton: false,

        tabValue: 0,
        editOptions: false,
      };
    },
    loginButton: (state) => {
      return {
        ...state,
        providerLogoutButton: true,
      };
    },
    editButton: (state) => {
      return {
        ...state,
        editOptions: !state.editOptions,
      };
    },

    tabValueNav: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        tabValue: action.payload,
      };
    },
    accessTokentest: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        login: { ...state.login, token: action.payload },
      };
    },
  },
});

export const {
  storeLoginInfo,
  refresh,
  pageUser,
  logoutButton,
  tabValueNav,
  loginButton,
  accessTokentest,
  storeLoginInfoupdate
  // editButton
} = loginSlice.actions;
// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.auth.login.token



export const loginReducer = loginSlice.reducer;
