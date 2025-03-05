import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '#/shared/store';

interface RouletteState {
  selectedCase: number;
}

const initialState: RouletteState = {
  selectedCase: 0
};

const rouletteSlice = createSlice({
  name: 'roulette',
  initialState,
  reducers: {
    setCase: (state, action: PayloadAction<number>) => {
      state.selectedCase = action.payload;
    }
  }
});

export const { setCase } = rouletteSlice.actions;
export const selectCase = (state: RootState) => state.roulette.selectedCase;
export default rouletteSlice.reducer;