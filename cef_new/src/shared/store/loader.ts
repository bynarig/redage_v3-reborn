// features/loader/loaderSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface LoaderState {
    [key: string]: {
        toggle: boolean;
        timeout: number | null;
    };
}

const initialState: LoaderState = {};

const loaderSlice = createSlice({
    name: 'loader',
    initialState,
    reducers: {
        setLoader: (
            state,
            action: PayloadAction<{
                name: string;
                toggle: boolean;
                onTimeout?: () => void;
            }>
        ) => {
            const {name, toggle, onTimeout} = action.payload;

            if (!state[name]) {
                state[name] = {toggle: false, timeout: null};
            }

            if (state[name].timeout) {
                clearTimeout(state[name].timeout);
                state[name].timeout = null;
            }

            if (toggle) {
                state[name].timeout = window.setTimeout(() => {
                    state[name].toggle = false;
                    state[name].timeout = null;
                    if (onTimeout) {
                        onTimeout();
                    }
                }, 10000);
            }

            state[name].toggle = toggle;
        },
        delayLoader: (
            state,
            action: PayloadAction<{
                name: string;
                timeSecond?: number;
                isMessage?: boolean;
            }>
        ) => {
            const {name, timeSecond = 1, isMessage = true} = action.payload;
            const currentTime = new Date().getTime();
            const delayTime = (state[name]?.timeout || 0);

            if (delayTime && delayTime > currentTime) {
                if (isMessage) {
                    window.notificationAdd(
                        4,
                        9,
                        `Попробуйте через ${Math.round((delayTime - currentTime) / 1000)} секунд!`,
                        3000
                    );
                }
                return;
            }

            if (!state[name]) {
                state[name] = {toggle: false, timeout: null};
            }
            state[name].timeout = currentTime + 1000 * timeSecond;
        },
        clearLoaderDelay: (state, action: PayloadAction<string>) => {
            const name = action.payload;
            if (state[name]) {
                state[name].timeout = null;
            }
        },
    },
});

export const {setLoader, delayLoader, clearLoaderDelay} = loaderSlice.actions;
export default loaderSlice.reducer;