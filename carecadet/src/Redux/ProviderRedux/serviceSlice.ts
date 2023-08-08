import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Ifacility {
  serviceData: any;
  facilityData:any;

}
const initialState: Ifacility = {
  serviceData: {},
  facilityData:[]
};

export const serviceSlice = createSlice({
  name: "servicedata",
  initialState,
  reducers: {
    serviceInfo: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        serviceData: action.payload,
      };
    },
    facilitynameInfo: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        facilityData: action.payload,
      };
    },
  },
});

export const {  serviceInfo,facilitynameInfo } = serviceSlice.actions;
export const serviceReducer = serviceSlice.reducer;
