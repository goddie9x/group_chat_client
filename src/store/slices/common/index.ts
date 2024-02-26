import { createSlice } from '@reduxjs/toolkit';
import { Language } from 'constants/enum/language';
import i18n from 'i18n';

export interface CommonState {
  isDarkMode: boolean;
  language: Language;
  isParticlesOn: boolean;
  isLoading: boolean;
  reloadHeader: boolean;
  musicOn: boolean;
}

const initialState: CommonState = {
  isDarkMode: false,
  language: Language.EN_US,
  isParticlesOn: false,
  isLoading: false,
  reloadHeader: false,
  musicOn: false,
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setDarkMode: (state, { payload }) => {
      state.isDarkMode = payload;
      localStorage.setItem('isDarkMode', payload);
    },
    setLanguage: (state, { payload }) => {
      state.language = payload;
      i18n.changeLanguage(payload);
      localStorage.setItem('language', payload);
    },
    setParticlesMode: (state, { payload }) => {
      state.isParticlesOn = payload;
      localStorage.setItem('isParticlesOn', payload);
    },
    loadParticlesMode: (state) => {
      state.isParticlesOn = localStorage.getItem('isParticlesOn') === 'true';
    },
    setMusicOn: (state, { payload }) => {
      state.musicOn = payload;
      localStorage.setItem('musicOn', payload);
    },
    loadLanguage: (state) => {
      state.language = localStorage.getItem('language') === Language.VI_VN ? Language.VI_VN : Language.EN_US;
      i18n.changeLanguage(state.language);
    },
    loadDarkMode: (state) => {
      state.isDarkMode = localStorage.getItem('isDarkMode') === 'true';
    },
    loadMusic: (state) => {
      state.musicOn = localStorage.getItem('musicOn') === 'true';
    },
    setLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    triggerReloadHeader: (state) => {
      state.reloadHeader = !state.reloadHeader;
    },
  },
});

const { reducer, actions } = commonSlice;

export const {
  setDarkMode,
  setLanguage,
  setParticlesMode,
  loadParticlesMode,
  loadLanguage,
  loadDarkMode,
  loadMusic,
  setLoading,
  triggerReloadHeader,
  setMusicOn,
} = actions;
export { reducer as commonReducer };
