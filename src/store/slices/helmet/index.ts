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
  title: 'Te11 CNTT1 K11',
  description: 'TE11 trang web của CNTT1 k11 E',
  relativePath: 'te11.herokuapp.com',
  image: 'https://te11.herokuapp.com/logo512.png',
  imageAlt: 'TE11',
  url: 'https://te11.herokuapp.com',
  siteName: 'Te11 CNTT1 k11 E',
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
