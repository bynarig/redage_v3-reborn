import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface HudState {
    isPlayer: boolean;
    isHelp: boolean;
    isWaterMark: boolean;
    isInputToggled: boolean;
    isPhone: boolean;
    inVehicle: boolean;
}

const initialState: HudState = {
    isPlayer: true,
    isHelp: true,
    isWaterMark: true,
    isInputToggled: false,
    isPhone: false,
    inVehicle: false
};

const hudSlice = createSlice({
    name: "hud",
    initialState,
    reducers: {
        setIsPlayer: (state, action: PayloadAction<boolean>) => {
            state.isPlayer = action.payload;
        },
        setIsHelp: (state, action: PayloadAction<boolean>) => {
            state.isHelp = action.payload;
        },
        setIsWaterMark: (state, action: PayloadAction<boolean>) => {
            state.isWaterMark = action.payload;
        },
        setIsInputToggled: (state, action: PayloadAction<boolean>) => {
            state.isInputToggled = action.payload;
            if (typeof mp !== "undefined") {
                mp.invoke("setTypingInChatState", action.payload);
            }
        },
        setIsPhone: (state, action: PayloadAction<boolean>) => {
            state.isPhone = action.payload;
        },
        setInVehicle: (state, action: PayloadAction<boolean>) => {
            state.inVehicle = action.payload;
        }
    }
});

export const {
    setIsPlayer,
    setIsHelp,
    setIsWaterMark,
    setIsInputToggled,
    setIsPhone,
    setInVehicle
} = hudSlice.actions;

//@ts-ignore
export const selectHud = (state: RootState) => state.hud;
export default hudSlice.reducer;
