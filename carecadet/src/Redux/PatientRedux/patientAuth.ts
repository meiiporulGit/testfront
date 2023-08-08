import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../Store";

import Cookies from "js-cookie";

// Define a type for the slice state
interface CounterState {
  patientLogin: any;
 
  patientLogoutButton: boolean;
  
}

// Define the initial state using that type
const initialState: CounterState = {
  patientLogin: {},
  
  patientLogoutButton: false,
  
};

export const patientLoginSlice = createSlice({
  name: "patientLogin",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
   
    patientLoginInfo: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        patientLogoutButton:true,
        patientLogin: action.payload,
      };
    },
    patientLogoutButton: (state) => {
      return {
        ...state,
        patientLogin: {},
        patientLogoutButton: false,

        
      };
    },
   
   

    
    
  },
});

export const {
  patientLoginInfo,
  
  patientLogoutButton,
  
  // editButton
} = patientLoginSlice.actions;
// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.auth.login.token



export const patientLoginReducer = patientLoginSlice.reducer;
