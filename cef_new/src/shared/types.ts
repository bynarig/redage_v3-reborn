export type EventCallback = (...args: any[]) => void;


// types.ts
export interface JobSkill {
    name: string;
    max: number;
    nextLevel: number;
    currentLevel: number;
    current: number;
}

export interface Time {
    TotalTime: number;
    Day: number;
    TodayTime: number;
    Month: number;
    MonthTime: number;
    Year: number;
    YearTime: number;
}

export interface CharData {
    UUID: number;
    CreateDate: number;
    Name: string;
    Gender: boolean;
    LVL: number;
    EXP: number;
    Vip: string;
    Status: number;
    Sim: number;
    Work: number;
    Lic: number[];
    Warns: number;
    Money: number;
    Bank: number;
    BankMoney: number;
    Fraction: number;
    FractionLVL: number;
    HouseId: number;
    HouseCash: number;
    HouseCopiesHour: number;
    HousePaid: number;
    HouseType: number;
    MaxCars: number;
    BizId: number;
    BizCash: number;
    BizCopiesHour: number;
    BizPaid: number;
    Time: Time;
    Kills: number;
    Deaths: number;
    EarnedMoney: number;
    EatTimes: number;
    Revived: number;
    Handshaked: number;
    IsLeader: boolean;
    IsMute: boolean;
    WeddingName: string;
    Licenses: number[];
    JobsSkills: JobSkill[];
}

export interface CharState {
    charData: CharData;
    charUUID: number;
    charName: string;
    charGender: boolean;
    charMoney: number;
    charBankMoney: number;
    charWorkID: number;
    charIsLeader: boolean;
    charFractionID: number;
    charFractionLVL: number;
    charOrganizationID: number;
    charEXP: number;
    charLVL: number;
    charWanted: number;
    charIsPet: boolean;
    charCreateDate: string;
    isOrgTable: boolean;
    charSim: number;
}