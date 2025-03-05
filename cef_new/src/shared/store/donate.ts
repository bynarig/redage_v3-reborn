import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DonateState {
  selectedView: string;
}

const initialState: DonateState = {
  selectedView: 'MainMenu'
};

const donateSlice = createSlice({
  name: 'donate',
  initialState,
  reducers: {
    setSelectedView(state, action: PayloadAction<string>) {
      state.selectedView = action.payload;
    }
  }
});

export const { setSelectedView } = donateSlice.actions;
export default donateSlice.reducer;