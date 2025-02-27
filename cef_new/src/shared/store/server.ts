// features/server/serverSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GetTime } from '#/shared/api/moment';
import { executeClient } from '#/shared/api/rage';

interface ServerState {
  serverId: number;
  serverDonatMultiplier: number;
  serverDonateDoubleConvert: number;
  serverDateTime: number;
  localDateTime: string;
  isEvent: boolean;
}

const initialState: ServerState = {
  serverId: 0,
  serverDonatMultiplier: 1,
  serverDonateDoubleConvert: 1.5,
  serverDateTime: new Date().getTime(),
  localDateTime: "2021-08-17T00:44:10.8644836+03:00",
  isEvent: false,
};

const serverSlice = createSlice({
  name: 'server',
  initialState,
  reducers: {
    setServerId: (state, action: PayloadAction<number>) => {
      state.serverId = action.payload;
    },
    setServerDonatMultiplier: (state, action: PayloadAction<number>) => {
      state.serverDonatMultiplier = action.payload;
    },
    setServerDonateDoubleConvert: (state, action: PayloadAction<number>) => {
      state.serverDonateDoubleConvert = action.payload;
    },
    setServerDateTime: (state, action: PayloadAction<string>) => {
      state.localDateTime = action.payload;
      state.serverDateTime = new Date(action.payload).getTime();

      // @ts-ignore
        const moment = GetTime(action.payload);
      executeClient("SetTime", moment.hours(), moment.minutes(), moment.unix());
    },
    setIsEvent: (state, action: PayloadAction<boolean>) => {
      state.isEvent = action.payload;
    },
  },
});

export const {
  setServerId,
  setServerDonatMultiplier,
  setServerDonateDoubleConvert,
  setServerDateTime,
  setIsEvent,
} = serverSlice.actions;

export const selectLocalDateTime = (state: { server: ServerState }) => state.server.localDateTime;

export default serverSlice.reducer;