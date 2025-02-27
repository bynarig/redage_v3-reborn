// charSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CharData, CharState } from '#/shared/types';

const initialState: CharState = {
    charData: {
        UUID: 0,
        CreateDate: 0,
        Name: "Nikita",
        Gender: true,
        LVL: 1,
        EXP: 1,
        Vip: "123",
        Status: 0,
        Sim: 0,
        Work: 0,
        Lic: [1, 0, 0, 0, 0, 0, 0, 0, 0],
        Warns: 0,
        Money: 0,
        Bank: 0,
        BankMoney: 0,
        Fraction: 1,
        FractionLVL: 6,
        HouseId: 0,
        HouseCash: 0,
        HouseCopiesHour: 0,
        HousePaid: 0,
        HouseType: 0,
        MaxCars: 0,
        BizId: 0,
        BizCash: 0,
        BizCopiesHour: 0,
        BizPaid: 0,
        Time: {
            TotalTime: 0,
            Day: 0,
            TodayTime: 0,
            Month: 0,
            MonthTime: 0,
            Year: 0,
            YearTime: 0,
        },
        Kills: 0,
        Deaths: 0,
        EarnedMoney: 0,
        EatTimes: 0,
        Revived: 0,
        Handshaked: 0,
        IsLeader: false,
        IsMute: false,
        WeddingName: "Source",
        Licenses: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        JobsSkills: [
            { name: "Электрик", max: 15000, nextLevel: 1000, currentLevel: 0, current: 0 },
            { name: "Газонокосильщик", max: 40000, nextLevel: 1000, currentLevel: 0, current: 0 },
            { name: "Почтальон", max: 4000, nextLevel: 1000, currentLevel: 0, current: 0 },
            { name: "Таксист", max: 1000, nextLevel: 5000, currentLevel: 0, current: 0 },
            { name: "Водитель автобуса", max: 70000, nextLevel: 1000, currentLevel: 0, current: 0 },
            { name: "Автомеханик", max: 250, nextLevel: 100, currentLevel: 0, current: 0 },
            { name: "Дальнобойщик", max: 700, nextLevel: 500, currentLevel: 0, current: 0 },
            { name: "Инкассатор", max: 3000, nextLevel: 1000, currentLevel: 0, current: 0 }
        ]
    },
    charUUID: 0,
    charName: "",
    charGender: false,
    charMoney: 0,
    charBankMoney: 0,
    charWorkID: 0,
    charIsLeader: false,
    charFractionID: 0,
    charFractionLVL: 0,
    charOrganizationID: 0,
    charEXP: 1,
    charLVL: 1,
    charWanted: 0,
    charIsPet: false,
    charCreateDate: "",
    isOrgTable: false,
    charSim: -1,
};

const charSlice = createSlice({
    name: 'char',
    initialState,
    reducers: {
        setCharData(state, action: PayloadAction<CharData>) {
            state.charData = action.payload;
        },
        setCharUUID(state, action: PayloadAction<number>) {
            state.charUUID = action.payload;
        },
        setCharName(state, action: PayloadAction<string>) {
            state.charName = action.payload;
        },
        setCharGender(state, action: PayloadAction<boolean>) {
            state.charGender = action.payload;
        },
        setCharMoney(state, action: PayloadAction<number>) {
            state.charMoney = action.payload;
        },
        setCharBankMoney(state, action: PayloadAction<number>) {
            state.charBankMoney = action.payload;
        },
        setCharWorkID(state, action: PayloadAction<number>) {
            state.charWorkID = action.payload;
        },
        setCharIsLeader(state, action: PayloadAction<boolean>) {
            state.charIsLeader = action.payload;
        },
        setCharFractionID(state, action: PayloadAction<number>) {
            state.charFractionID = action.payload;
        },
        setCharFractionLVL(state, action: PayloadAction<number>) {
            state.charFractionLVL = action.payload;
        },
        setCharOrganizationID(state, action: PayloadAction<number>) {
            state.charOrganizationID = action.payload;
        },
        setCharEXP(state, action: PayloadAction<number>) {
            state.charEXP = action.payload;
        },
        setCharLVL(state, action: PayloadAction<number>) {
            state.charLVL = action.payload;
        },
        setCharWanted(state, action: PayloadAction<number>) {
            state.charWanted = action.payload;
        },
        setCharIsPet(state, action: PayloadAction<boolean>) {
            state.charIsPet = action.payload;
        },
        setCharCreateDate(state, action: PayloadAction<string>) {
            state.charCreateDate = action.payload;
        },
        setIsOrgTable(state, action: PayloadAction<boolean>) {
            state.isOrgTable = action.payload;
        },
        setCharSim(state, action: PayloadAction<number>) {
            state.charSim = action.payload;
        },
        updateCharData(state, action: PayloadAction<{ name: keyof CharData; value: any }>) {
            const { name, value } = action.payload;
            // @ts-ignore
            state.charData[name] = value;
        },
    },
});

export const {
    setCharData,
    setCharUUID,
    setCharName,
    setCharGender,
    setCharMoney,
    setCharBankMoney,
    setCharWorkID,
    setCharIsLeader,
    setCharFractionID,
    setCharFractionLVL,
    setCharOrganizationID,
    setCharEXP,
    setCharLVL,
    setCharWanted,
    setCharIsPet,
    setCharCreateDate,
    setIsOrgTable,
    setCharSim,
    updateCharData,
} = charSlice.actions;

export default charSlice.reducer;