import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './index';

// Define the type for a player
interface Player {
    id: number;
    name: string;
    level: number;
    ping: number;
}

// Define the state structure for the player list
interface PlayerListState {
    items: Player[];
}

// Define the initial state
const initialState: PlayerListState = {
    items: [],
};

// Create the slice
const playerList = createSlice({
    name: 'playerList',
    initialState,
    reducers: {
        // Reducer to add a player to the list
        addPlayer(state, action: PayloadAction<Player>) {
            state.items.push(action.payload);
        },
        // Reducer to update the player list
        updatePlayerList(state, action: PayloadAction<Player[]>) {
            state.items = action.payload;
        },
    },
});

// Export the actions
export const { addPlayer, updatePlayerList } = playerList.actions;

// Selector to get the player list items
export const selectPlayerListItems = (state: RootState) => state.playerList.items;

// Export the reducer
export default playerList.reducer;