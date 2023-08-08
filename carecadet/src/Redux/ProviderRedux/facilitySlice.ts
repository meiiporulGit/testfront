import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Ifacility {
  fData: any;
  service: any;
  nppes:any;
  facilityTypedata:any;
}
const initialState: Ifacility = {
  fData: {},
  service: {},
  nppes:[],
  facilityTypedata:[]
};

export const facilitySlice = createSlice({
  name: "facilitydata",
  initialState,
  reducers: {
    facilityInfo: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        fData: action.payload,
      };
    },
    nppesInfo:(state,action:PayloadAction<any>) =>{
      return{
        ...state,
        nppes:action.payload
      }
    },
    facilityTypeInfo:(state,action:PayloadAction<any>) =>{
      return{
        ...state,
        facilityTypedata:action.payload
      }
    }
   
  },
});

export const { facilityInfo, nppesInfo, facilityTypeInfo } = facilitySlice.actions;
export const facilityReducer = facilitySlice.reducer;

