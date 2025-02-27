// features/quests/questsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface QuestsState {
  quests: Record<string, any>; // Adjust type as needed
  selectedQuest: number;
}

const initialState: QuestsState = {
  quests: {},
  selectedQuest: 0,
};

const questsSlice = createSlice({
  name: 'quests',
  initialState,
  reducers: {
    initQuests: (state, action: PayloadAction<Record<string, any>>) => {
      state.quests = action.payload;
    },
    selectQuest: (state, action: PayloadAction<number>) => {
      state.selectedQuest = action.payload;
    },
  },
});

export const { initQuests, selectQuest } = questsSlice.actions;
export default questsSlice.reducer;