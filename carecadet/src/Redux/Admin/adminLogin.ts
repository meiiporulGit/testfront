import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../Store";

import Cookies from "js-cookie";

// Define a type for the slice state
interface CounterState {
  adminLogin: any;
 
  adminLogoutButton: boolean;
  
}

// Define the initial state using that type
const initialState: CounterState = {
    adminLogin: {},
  
    adminLogoutButton: false,
  
};

export const adminLoginSlice = createSlice({
  name: "admintLogin",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
   
    adminLoginInfo: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        adminLogoutButton:true,
        adminLogin: action.payload,
      };
    },
    adminLogoutButton: (state) => {
      return {
        ...state,
        adminLogin: {},
        adminLogoutButton: false,

        
      };
    },
    adminAccessTokentest: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        adminLogin: { ...state.adminLogin, token: action.payload },
      };
    },
   
   

    
    
  },
});

export const {
    adminLoginInfo,
  
    adminLogoutButton,
    adminAccessTokentest
  
  // editButton
} = adminLoginSlice.actions;
// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.auth.login.token



export const adminLoginReducer = adminLoginSlice.reducer;
