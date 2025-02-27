// features/settings/settingsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
  Timestamp: boolean;
  ChatShadow: boolean;
  Fontsize: number;
  Chatalpha: number;
  Pagesize: number;
  Widthsize: number;
  Transition: number;
  WalkStyle: number;
  FacialEmotion: number;
  Deaf: boolean;
  TagsHead: boolean;
  HudToggled: boolean;
  HudStats: boolean;
  HudSpeed: boolean;
  HudOnline: boolean;
  HudLocation: boolean;
  HudKey: boolean;
  HudMap: boolean;
  HudCompass: boolean;
  VolumeInterface: number;
  VolumeQuest: number;
  VolumeAmbient: number;
  VolumePhoneRadio: number;
  VolumeVoice: number;
  VolumeRadio: number;
  VolumeBoombox: number;
  FirstMute: boolean;
  DistancePlayer: number;
  DistanceVehicle: number;
  cPToggled: boolean;
  cPWidth: number;
  cPGap: number;
  cPDot: boolean;
  cPThickness: number;
  cPColorR: number;
  cPColorG: number;
  cPColorB: number;
  cPOpacity: number;
  cPCheck: boolean;
  APunishments: boolean;
  CircleVehicle: boolean;
  cEfValue: number;
  notifCount: number;
  hitPoint: boolean;
}

const initialState: SettingsState = {
  Timestamp: false,
  ChatShadow: true,
  Fontsize: 16,
  Chatalpha: 100,
  Pagesize: 10,
  Widthsize: 50,
  Transition: 0,
  WalkStyle: 0,
  FacialEmotion: 0,
  Deaf: false,
  TagsHead: true,
  HudToggled: true,
  HudStats: true,
  HudSpeed: true,
  HudOnline: true,
  HudLocation: true,
  HudKey: true,
  HudMap: true,
  HudCompass: true,
  VolumeInterface: 100,
  VolumeQuest: 50,
  VolumeAmbient: 80,
  VolumePhoneRadio: 50,
  VolumeVoice: 100,
  VolumeRadio: 70,
  VolumeBoombox: 70,
  FirstMute: false,
  DistancePlayer: 50,
  DistanceVehicle: 50,
  cPToggled: false,
  cPWidth: 2,
  cPGap: 2,
  cPDot: true,
  cPThickness: 0,
  cPColorR: 255,
  cPColorG: 255,
  cPColorB: 255,
  cPOpacity: 9,
  cPCheck: true,
  APunishments: false,
  CircleVehicle: false,
  cEfValue: 0,
  notifCount: 2,
  hitPoint: false,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSettings: (state, action: PayloadAction<SettingsState>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setSettings } = settingsSlice.actions;
export default settingsSlice.reducer;