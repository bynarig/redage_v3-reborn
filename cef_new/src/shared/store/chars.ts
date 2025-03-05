// charSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CharData} from '#/shared/types';
import { RootState } from '.';

interface CharState {
    charData: CharData;
    isOrgTable: boolean;
}

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
        Money: 777,
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
        ],
        Organization: 0,
        IsPet: false
    },
    isOrgTable: false,
};

const charSlice = createSlice({
    name: 'char',
    initialState,
    reducers: {
        setCharData(state, action: PayloadAction<CharData>) {
            state.charData = action.payload;
        },
        setCharProperty(state, action: PayloadAction<{ key: keyof CharData; value: any }>) {
            const { key, value } = action.payload;
            state.charData[key] = value;
        },
        setIsOrgTable(state, action: PayloadAction<boolean>) {
            state.isOrgTable = action.payload;
        },
        updateCharData(state, action: PayloadAction<{ name: keyof CharData; value: any }>) {
            const { name, value } = action.payload;
            state.charData[name] = value;
        },
    },
});

export const {
    setCharData,
    setCharProperty,
    setIsOrgTable,
    updateCharData,
} = charSlice.actions;

// Selectors
export const selectCharData = (state: RootState) => state.char.charData;
export const selectCharUUID = (state: RootState) => state.char.charData.UUID;
export const selectCharName = (state: RootState) => state.char.charData.Name;
export const selectCharGender = (state: RootState) => state.char.charData.Gender;
export const selectCharMoney = (state: RootState) => state.char.charData.Money;
export const selectCharBankMoney = (state: RootState) => state.char.charData.BankMoney;
export const selectCharWorkID = (state: RootState) => state.char.charData.Work;
export const selectCharIsLeader = (state: RootState) => state.char.charData.IsLeader;
export const selectCharFractionID = (state: RootState) => state.char.charData.Fraction;
export const selectCharFractionLVL = (state: RootState) => state.char.charData.FractionLVL;
export const selectCharEXP = (state: RootState) => state.char.charData.EXP;
export const selectCharLVL = (state: RootState) => state.char.charData.LVL;
export const selectCharWanted = (state: RootState) => state.char.charData.Status;
export const selectCharSim = (state: RootState) => state.char.charData.Sim;
export const selectCharCreateDate = (state: RootState) => state.char.charData.CreateDate;
export const selectIsOrgTable = (state: RootState) => state.char.isOrgTable;

// For compatibility with existing code, map old action creators to new ones
export const setCharUUID = (uuid: number) => setCharProperty({ key: 'UUID', value: uuid });
export const setCharName = (name: string) => setCharProperty({ key: 'Name', value: name });
export const setCharGender = (gender: boolean) => setCharProperty({ key: 'Gender', value: gender });
export const setCharMoney = (money: number) => setCharProperty({ key: 'Money', value: money });
export const setCharBankMoney = (bankMoney: number) => setCharProperty({ key: 'BankMoney', value: bankMoney });
export const setCharWorkID = (workId: number) => setCharProperty({ key: 'Work', value: workId });
export const setCharIsLeader = (isLeader: boolean) => setCharProperty({ key: 'IsLeader', value: isLeader });
export const setCharFractionID = (fractionId: number) => setCharProperty({ key: 'Fraction', value: fractionId });
export const setCharFractionLVL = (fractionLvl: number) => setCharProperty({ key: 'FractionLVL', value: fractionLvl });
export const setCharOrganizationID = (orgId: number) => setCharProperty({ key: 'Organization', value: orgId });
export const setCharEXP = (exp: number) => setCharProperty({ key: 'EXP', value: exp });
export const setCharLVL = (lvl: number) => setCharProperty({ key: 'LVL', value: lvl });
export const setCharWanted = (wanted: number) => setCharProperty({ key: 'Status', value: wanted });
export const setCharIsPet = (isPet: boolean) => setCharProperty({ key: 'IsPet', value: isPet });
export const setCharCreateDate = (date: string) => setCharProperty({ key: 'CreateDate', value: date });
export const setCharSim = (sim: number) => setCharProperty({ key: 'Sim', value: sim });

export default charSlice.reducer;