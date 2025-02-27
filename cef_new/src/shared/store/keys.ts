// features/keys/keysSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface KeysState {
  [key: number]: number;
}

const initialState: KeysState = {};
for (let i = 0; i < 100; i++) {
  initialState[i] = 85;
}

const keysSlice = createSlice({
  name: 'keys',
  initialState,
  reducers: {
    updateKeyValue: (state, action: PayloadAction<{ key: number; value: number }>) => {
      const { key, value } = action.payload;
      if (state[key] !== value) {
        state[key] = value;
      }
    },
  },
});

export const { updateKeyValue } = keysSlice.actions;
export default keysSlice.reducer;