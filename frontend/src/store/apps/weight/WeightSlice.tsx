import axios from "../../../utils/axios";
import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "@/store/store";

interface WeightType {
  weights: any[];
  selectedWeight: any;
}

// interface ChangeState {
//   isChangePost: boolean;
// }

const initialState = {
  weights: [],
  selectedWeight: null,
} as WeightType;

export const WeightSlice = createSlice({
  name: "weight",
  initialState,
  reducers: {
    getWeights: (state: WeightType, action) => {
      state.weights = action.payload;
    },
    getWeight: (state: WeightType, action) => {
      state.selectedWeight= action.payload;
    },
  },
});

export const { getWeights, getWeight} =
WeightSlice.actions;

export default WeightSlice.reducer;



