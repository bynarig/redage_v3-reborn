// features/animations/animationsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { executeClient } from '#/shared/api/rage';

interface AnimationState {
    animFavorites: string[];
    animBind: number[];
}

const initialState: AnimationState = {
    animFavorites: [],
    animBind: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
};

const animationsSlice = createSlice({
    name: 'animations',
    initialState,
    reducers: {
        initAnimFavorites(state, action: PayloadAction<string[]>) {
            state.animFavorites = action.payload;
        },
        addAnimFavorite(state, action: PayloadAction<string>) {
            if (!state.animFavorites.includes(action.payload)) {
                state.animFavorites.push(action.payload);
                executeClient("client.animation.favorite", JSON.stringify(state.animFavorites));
            }
        },
        dellAnimFavorite(state, action: PayloadAction<string>) {
            state.animFavorites = state.animFavorites.filter(anim => anim !== action.payload);
            executeClient("client.animation.favorite", JSON.stringify(state.animFavorites));
        },
        initAnimBind(state, action: PayloadAction<number[]>) {
            state.animBind = action.payload;
        },
        addAnimBind(state, action: PayloadAction<{ index: number, anim: number }>) {
            const { index, anim } = action.payload;
            state.animBind[index] = anim;
            executeClient("client.animation.bind", JSON.stringify(state.animBind));
        },
        dellAnimBind(state, action: PayloadAction<number>) {
            const index = state.animBind.indexOf(action.payload);
            if (index !== -1) {
                state.animBind[index] = 0;
                executeClient("client.animation.bind", JSON.stringify(state.animBind));
            }
        }
    }
});

export const { initAnimFavorites, addAnimFavorite, dellAnimFavorite, initAnimBind, addAnimBind, dellAnimBind } = animationsSlice.actions;
export default animationsSlice.reducer;