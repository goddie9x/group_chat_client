import { createSlice } from '@reduxjs/toolkit';

export type THelmetProps = {
  type?: string;
  title?: string;
  description?: string;
  relativePath?: string;
  image?: string;
  imageAlt?: string;
  url?: string;
  siteName?: string;
  creators?: string;
  twitterSite?: string;
};

const initialState = {
  type: 'website',
  title: 'TChat Tâm',
  description: 'TChat trang web của Tâm',
  relativePath: 'TChat.herokuapp.com',
  image: 'https://TChat.herokuapp.com/logo512.png',
  imageAlt: 'TChat',
  url: 'https://TChat.herokuapp.com',
  siteName: 'TChat Tâm',
  creators: '@goddie9x',
  twitterSite: '@goddie9x',
};

const HelmetSlice = createSlice({
  name: 'helmet',
  initialState,
  reducers: {
    setHelmet: (state, { payload }) => {
      state = Object.assign(state, state, payload);
    },
  },
});

const { reducer, actions } = HelmetSlice;

export const { setHelmet } = actions;
export { reducer as helmetReducer };
