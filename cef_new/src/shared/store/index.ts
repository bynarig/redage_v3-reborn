import {configureStore} from '@reduxjs/toolkit';
import charReducer from './chars';
import accountSlice from './account';
import animationSlice from './animation';
import customisationSlice from './customization';
import hudSlice from './hud';
import keysSlice from './keys';
import inputSlice from './input';
import loaderSlice from './loader';
import newsSlice from './news';
import questSlice from './quest';
import serverSlice from './server';
import settingsSlice from './settings';
import playerListSlice from "./playerList";
import DonateSlice from "./donate";

export const store = configureStore({
  reducer: {
    account: accountSlice,
    animation: animationSlice,
    char: charReducer,
    // customisation: customisationSlice,
    hud: hudSlice,
    input: inputSlice,
    keys: keysSlice,
    loader: loaderSlice,
    news: newsSlice,
    quest: questSlice,
    server: serverSlice,
    settings: settingsSlice,
    playerList: playerListSlice,
    donate: DonateSlice,
  },
});

export type RootState = any;
export type AppDispatch = typeof store.dispatch;
