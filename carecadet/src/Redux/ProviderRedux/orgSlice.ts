import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../Store";

import Cookies from "js-cookie";

// Define a type for the slice state
interface CounterState {
  orgEditData: any;
  orgEditImage: any;
}

// Define the initial state using that type
const initialState: CounterState = {
  orgEditData: {},
  orgEditImage: "",
};

export const editSlice = createSlice({
  name: "edit",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    organizationEdit: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        orgEditData: action.payload,
      };
    },
    organizationImage: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        orgEditImage: action.payload,
      };
    },
    refrestState: (state) => {
      state.orgEditData = {};
    },
    orgid: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        orgid: action.payload,
      };
    },
  },
});

export const { organizationEdit, organizationImage, refrestState, orgid } =
  editSlice.actions;
// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.auth.login.token
// console.log("orgid", orgid)

export const organizationReducer = editSlice.reducer;
