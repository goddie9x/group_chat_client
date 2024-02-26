import { createSlice } from '@reduxjs/toolkit';

export interface AlertState {
  open: boolean;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
}

const initialState: AlertState = {
  open: false,
  type: 'success',
  title: '',
  message: '',
};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlert: (state, { payload }) => {
      state.open = true;
      state.type = payload.type;
      state.title = payload.title;
      state.message = payload.message;
    },
    clearAlert: (state) => {
      state.open = false;
      state.type = 'success';
      state.title = '';
      state.message = '';
    },
  },
});

const { actions, reducer } = alertSlice;

export const { setAlert, clearAlert } = actions;
export { reducer as alertReducer };
