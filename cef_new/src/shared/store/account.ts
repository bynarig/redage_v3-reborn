import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {RootState} from "#/shared/store/index";

interface Character {
    Data: { DeleteData?: any };
}

interface AccountState {
    Login: string;
    SocialClub: string;
    Redbucks: number;
    Vip: number;
    VipDate: string;
    Unique: string;
    LastSelectCharUUID: number;
    Subscribe: boolean;
    charsSlot: number[];
    chars: Record<number, Character>;
    otherStatsData: any;
    accountIsSession: number;
    accountEmail: string;
}

const initialState: AccountState = {
    Login: "null",
    SocialClub: "null",
    Redbucks: 0,
    Vip: 0,
    VipDate: "null",
    Unique: "null",
    LastSelectCharUUID: 0,
    Subscribe: false,
    charsSlot: [-1, -1, -2, -2, -2, -2, -2, -2, -2],
    chars: {},
    otherStatsData: {},
    accountIsSession: 0,
    accountEmail: ""
};

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        setAccountData: (state, action: PayloadAction<AccountState>) => {
            return { ...state, ...action.payload };
        },
        unlockSlot: (state, action: PayloadAction<number>) => {
            state.charsSlot[action.payload] = -1;
        },
        deleteCharacter: (state, action: PayloadAction<{ slot: number; data: any }>) => {
            const uuid = state.charsSlot[action.payload.slot];
            if (state.chars[uuid]) {
                state.chars[uuid].Data.DeleteData = action.payload.data;
            }
        },
        deleteSuccessCharacter: (state, action: PayloadAction<number>) => {
            const uuid = state.charsSlot[action.payload];
            state.charsSlot[action.payload] = -1;
            delete state.chars[uuid];
        },
        setOtherStatsData: (state, action: PayloadAction<any>) => {
            state.otherStatsData = action.payload;
        },
        setRedbucks: (state, action: PayloadAction<number>) => {
            state.Redbucks = action.payload;
        },
        setUnique: (state, action: PayloadAction<string>) => {
            state.Unique = action.payload;
        },
        setVip: (state, action: PayloadAction<number>) => {
            state.Vip = action.payload;
        },
        setVipDate: (state, action: PayloadAction<string>) => {
            state.VipDate = action.payload;
        },
        setSubscribe: (state, action: PayloadAction<boolean>) => {
            state.Subscribe = action.payload;
        },
        setLogin: (state, action: PayloadAction<string>) => {
            state.Login = action.payload;
        },
        setSocialClub: (state, action: PayloadAction<string>) => {
            state.SocialClub = action.payload;
        },
        setSelectCharId: (state, action: PayloadAction<number>) => {
            state.LastSelectCharUUID = action.payload;
        },
        setIsSession: (state, action: PayloadAction<number>) => {
            state.accountIsSession = action.payload;
        },
        setEmail: (state, action: PayloadAction<string>) => {
            state.accountEmail = action.payload;
        }
    }
});

export const {
    setAccountData,
    unlockSlot,
    deleteCharacter,
    deleteSuccessCharacter,
    setOtherStatsData,
    setRedbucks,
    setUnique,
    setVip,
    setVipDate,
    setSubscribe,
    setLogin,
    setSocialClub,
    setSelectCharId,
    setIsSession,
    setEmail
} = accountSlice.actions;
//@ts-ignore
export const selectAccount = (state: RootState) => state.account;
export const selectAccountVip = (state: RootState) => state.account.Vip;
export default accountSlice.reducer;
