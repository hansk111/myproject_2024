import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Location {
  latitude: number | null;
  longitude: number | null;
}

const initialState: Location = {
  latitude: null,
  longitude: null,
};

export const LocationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    getPosition: (state, action: PayloadAction<{ latitude: number; longitude: number }>) => {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
    },
    clearPosition: (state) => {
      state.latitude = null;
      state.longitude = null;
    },
  },
});

export const { getPosition, clearPosition } = LocationSlice.actions;
export default LocationSlice.reducer;
