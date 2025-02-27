import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./index";
import { executeClient } from "#/shared/api/rage";
import CreateNewCustomization from "../../entities/createNewCustomisation";
import appearances from "#/store/player/newauthentication/chars/create/elements/appearance/appearances.js";
import parents from "#/store/player/newauthentication/chars/create/elements/info/parents.js";
import characteristicsIndexes from "#/store/player/newauthentication/chars/create/elements/characteristics/indexes.js";
import clothes from "#/store/player/newauthentication/chars/create/elements/clothes/clothes.js";

interface CharacterCustomization {
    FirstName?: string;
    LastName?: string;
    motherId?: number;
    fatherId?: number;
    shapeMix?: number;
    skinTone?: number;
    [key: string]: any;
}

interface CustomizationState {
    gender: number;
    characters: CharacterCustomization[];
    selectIndex: number;
    initialized: boolean;
}

const initialState: CustomizationState = {
    gender: 0,
    characters: Array(3).fill({ gender: 0, false: {}, true: {} }),
    selectIndex: 0,
    initialized: false,
};

const customizationSlice = createSlice({
    name: "customization",
    initialState,
    reducers: {
        updateIndex: (state, action: PayloadAction<number>) => {
            state.selectIndex = action.payload;
            executeClient("client.characters.customization.updateIndex", action.payload);
        },
        updateGender: (state, action: PayloadAction<boolean>) => {
            const index = state.selectIndex;
            state.characters[index].gender = action.payload;
            executeClient("client.characters.customization.UpdateGender", action.payload);
        },
        updateParents: (state, action: PayloadAction<{ gender: boolean; mother: number; father: number }>) => {
            const { gender, mother, father } = action.payload;
            state.characters[state.selectIndex][gender].motherId = mother;
            state.characters[state.selectIndex][gender].fatherId = father;
            executeClient("client.characters.customization.UpdateParents", gender, parents[false][mother].gtaId, parents[true][father].gtaId);
        },
        updateShapeMix: (state, action: PayloadAction<{ gender: boolean; shapeMix: number }>) => {
            const { gender, shapeMix } = action.payload;
            state.characters[state.selectIndex][gender].shapeMix = shapeMix;
            executeClient("client.characters.customization.UpdateShapeMix", gender, shapeMix);
        },
        updateSkinTone: (state, action: PayloadAction<{ gender: boolean; skinTone: number }>) => {
            const { gender, skinTone } = action.payload;
            state.characters[state.selectIndex][gender].skinTone = skinTone;
            executeClient("client.characters.customization.UpdateSkinTone", gender, skinTone);
        },
        updateCharacteristic: (state, action: PayloadAction<{ gender: boolean; key: string; preset: number; x: number; y: number }>) => {
            const { gender, key, preset, x, y } = action.payload;
            state.characters[state.selectIndex][gender][key] = { preset, x, y };
            const indexes = characteristicsIndexes[key];
            executeClient("client.characters.customization.UpdateCharacteristic", gender, indexes.xindex, x, indexes.yindex, y);
        },
        updateAppearance: (state, action: PayloadAction<{ gender: boolean; key: string; id: number; color: number; opacity: number }>) => {
            const { gender, key, id, color, opacity } = action.payload;
            state.characters[state.selectIndex][gender][key] = { id, color, opacity };
            let appearance = Array.isArray(appearances[key]) ? appearances[key] : appearances[key][gender];
            executeClient("client.characters.customization.UpdateAppearance", gender, key, appearance[id].id, color, opacity);
        },
        updateClothes: (state, action: PayloadAction<{ gender: boolean; key: string; newCloth: number }>) => {
            const { gender, key, newCloth } = action.payload;
            state.characters[state.selectIndex][gender][key] = newCloth;
            let cloth = clothes[gender][key][newCloth];
            executeClient("client.characters.customization.UpdateClothes", gender, key, cloth.drawable, cloth.texture);
        },
        updateFirstName: (state, action: PayloadAction<string>) => {
            state.characters[state.selectIndex][state.gender].FirstName = action.payload;
        },
        updateLastName: (state, action: PayloadAction<string>) => {
            state.characters[state.selectIndex][state.gender].LastName = action.payload;
        },
        initializeCustomizations: (state) => {
            for (let i = 0; i < 3; i++) {
                CreateNewCustomization(false);
                CreateNewCustomization(true);
            }
            state.initialized = true;
            executeClient("client.characters.initChars");
        },
    },
});

export const {
    updateIndex,
    updateGender,
    updateParents,
    updateShapeMix,
    updateSkinTone,
    updateCharacteristic,
    updateAppearance,
    updateClothes,
    updateFirstName,
    updateLastName,
    initializeCustomizations,
} = customizationSlice.actions;

//@ts-ignore
export const selectCustomization = (state: RootState) => state.customization;
export default customizationSlice.reducer;