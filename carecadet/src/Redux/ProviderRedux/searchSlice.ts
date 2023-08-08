import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Search {
  searchData: any;
  

}
const initialState: Search = {
 searchData:{}
};

export const searchSlice = createSlice({
  name: "searchdata",
  initialState,
  reducers: {
  searchInfo:(state, action: PayloadAction<any>)=>{
    return {
        ...state,
        searchData:action.payload
    }
  }
  },
});

export const {   } = searchSlice.actions;
export const serviceReducer = searchSlice.reducer;
