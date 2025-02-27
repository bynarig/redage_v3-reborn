import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./index";

interface InputState {
    [key: string]: string | undefined;
}

const initialState: InputState = {};

// @ts-ignore
const inputSlice = createSlice({
    name: "input",
    initialState,
    reducers: {
        setInput: (state, action: PayloadAction<{ key: string; value: string }>) => {
            state[action.payload.key] = action.payload.value;
        },
        // @ts-ignore
        getInput: (state, action: PayloadAction<string>) => {
            return state[action.payload] || "";
        },
        deleteInput: (state, action: PayloadAction<string>) => {
            delete state[action.payload];
        }
    }
});

export const { setInput, getInput, deleteInput } = inputSlice.actions;
// @ts-ignore
export const selectInput = (state: RootState) => state.input;
export default inputSlice.reducer;
