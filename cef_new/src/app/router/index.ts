import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "#/shared/store";

interface RouterState {
    popup: string;
    popupData: any;
    popupFunc: (() => void) | null;
    view: string;
    viewData: any;
    PlayerGameMenu: boolean;
    PlayerHud: boolean;
    opacity: number;
}

const initialState: RouterState = {
    popup: "",
    popupData: null,
    popupFunc: null,
    view: "PlayerAuthentication",
    viewData: null,
    PlayerGameMenu: false,
    PlayerHud: false,
    opacity: 1
};

const routerSlice = createSlice({
    name: "router",
    initialState,
    reducers: {
        setView: (state, action: PayloadAction<{ page: string; data?: any }>) => {
            return { ...initialState, view: action.payload.page, viewData: action.payload.data ?? null };
        },
        setViewData: (state, action: PayloadAction<any>) => {
            state.viewData = action.payload;
        },
        addViewData: (state, action: PayloadAction<any>) => {
            state.viewData = { ...state.viewData, ...action.payload };
        },
        setPopUp: (state, action: PayloadAction<{ page?: string; data?: any; func?: () => void }>) => {
            state.popup = action.payload.page ?? "";
            state.popupData = action.payload.data ?? null;
            state.popupFunc = action.payload.func ?? null;
        },
        setPopUpData: (state, action: PayloadAction<any>) => {
            state.popupData = action.payload;
        },
        updateStatic: (state, action: PayloadAction<string | undefined>) => {
            return { ...initialState, [action.payload ?? ""]: true };
        },
        setHud: (state, action: PayloadAction<string | undefined>) => {
            if (!action.payload || action.payload === state.view) {
                return { ...initialState, PlayerHud: true };
            }
        },
        close: () => {
            return { ...initialState };
        },
        setOpacity: (state, action: PayloadAction<number>) => {
            state.opacity = action.payload;
        }
    }
});

export const {
    setView,
    setViewData,
    addViewData,
    setPopUp,
    setPopUpData,
    updateStatic,
    setHud,
    close,
    setOpacity
} = routerSlice.actions;

//@ts-ignore
export const selectRouter = (state: RootState) => state.router;
export default routerSlice.reducer;
