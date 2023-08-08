import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Ifacility {
  ViewData: any;

}
const initialState: Ifacility = {
  ViewData: {},

};

export const serviceViewSlice = createSlice({
  name: "Viewdata",
  initialState,
  reducers: {
    ViewInfo: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        ViewData: action.payload,
      };
    },
  
  },
});

export const {  ViewInfo } = serviceViewSlice.actions;
export const serviceViewReducer = serviceViewSlice.reducer;
