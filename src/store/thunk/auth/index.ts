import { createAsyncThunk } from '@reduxjs/toolkit';
import { setAlert } from 'store/slices/alert';
import { USER_ENDPOINT } from 'constants/apiEndPoint';
import { AUTH_PREFIX } from 'constants/thunkPrefix';
import fetchDataWithCredential from 'utils/fetchDataWithCredential';
import i18n from 'i18n';
import {
  incrementLoginAttempts,
  closeRegisterModal,
  incrementRegisterAttempts,
  turnOffReCaptchaRegister,
  setIsLogin,
} from 'store/slices/auth';

import { setLoading } from 'store/slices/common';
interface LoginSchema {
  account?: string;
  password?: string;
  email?: string;
}

export const login = createAsyncThunk(AUTH_PREFIX.LOGIN, async (data: LoginSchema, { dispatch, rejectWithValue }) => {
  dispatch(setLoading(true));

  const response = await fetchDataWithCredential({
    url: USER_ENDPOINT.LOGIN,
    method: 'POST',
    body: data,
  });
  const jsonData = await response.json();

  if (response.status < 200 || response.status >= 300) {
    dispatch(setLoading(false));
    dispatch(setAlert({ title: i18n.t('error'), message: i18n.t('login_failed'), type: 'error' }));
    if (response.status == 403) {
      dispatch(setAlert({ title: i18n.t('error'), message: i18n.t('account_banned'), type: 'error' }));
    }
    dispatch(incrementLoginAttempts());
    return rejectWithValue(i18n.t('login_failed'));
  }
  dispatch(setLoading(false));
  dispatch(setAlert({ title: i18n.t('success'), message: i18n.t('login_success'), type: 'success' }));
  return jsonData;
});

export const sendEmailResetPassword = createAsyncThunk(
  AUTH_PREFIX.REQUEST_RESET_PASSWORD,
  async (data: LoginSchema, { dispatch }) => {
    dispatch(setLoading(true));

    const response = await fetchDataWithCredential({
      url: USER_ENDPOINT.REQUEST_RESET_PASSWORD,
      method: 'POST',
      body: data,
    });

    if (response.status > 400) {
      dispatch(setLoading(false));
      dispatch(setAlert({ title: i18n.t('error'), message: i18n.t('send_email_reset_password_failed'), type: 'error' }));
    } else {
      dispatch(setLoading(false));
      dispatch(
        setAlert({
          title: i18n.t('success'),
          message: i18n.t('send_email_reset_password_success_please_check_your_inbox'),
          type: 'success',
        }),
      );
    }
  },
);

export const getCurrentUserData = createAsyncThunk(AUTH_PREFIX.GET_CURRENT_USER_INFO, async (_, { dispatch }) => {
  dispatch(setLoading(true));
  
  const tokenUser = localStorage.getItem('tokenUser');

  try {
    const response = await fetchDataWithCredential({
      url: USER_ENDPOINT.GET_CURRENT_USER_INFO,
      method: 'POST',
      body: { tokenUser },
    });
    const jsonData = await response.json();

    if (response.status < 200 || response.status >= 300) {
      dispatch(setLoading(false));
      dispatch(
        setAlert({
          title: i18n.t('you_are_not_logged_in'),
          message: i18n.t('you_should_login_to_get_more_infomation'),
          type: 'warning',
        }),
      );
      return null;
    }

    dispatch(setLoading(false));
    dispatch(setIsLogin(true));
    dispatch(setAlert({ title: i18n.t('success'), message: i18n.t('login_success'), type: 'success' }));
    return jsonData;
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(
      setAlert({
        title: i18n.t('you_are_not_logged_in'),
        message: i18n.t('you_should_login_to_get_more_infomation'),
        type: 'warning',
      }),
    );
    return null;
  }
});

export const register = createAsyncThunk(AUTH_PREFIX.REGISTER, async (data: LoginSchema, { dispatch }) => {
  dispatch(setLoading(true));
  const response = await fetchDataWithCredential({
    url: USER_ENDPOINT.REGISTER,
    method: 'POST',
    body: data,
  });

  dispatch(setLoading(false));
  if (response.status >= 400) {
    if (response.status === 401) {
      dispatch(setAlert({ title: i18n.t('error'), message: i18n.t('account_already_exists'), type: 'error' }));
    } else if (response.status === 402) {
      dispatch(setAlert({ title: i18n.t('error'), message: i18n.t('email_already_exists'), type: 'error' }));
    } else {
      dispatch(setAlert({ title: i18n.t('error'), message: i18n.t('register_failed'), type: 'error' }));
    }
    dispatch(incrementRegisterAttempts());
  } else {
    const jsonData = await response.json();

    dispatch(setAlert({ title: i18n.t('success'), message: i18n.t('register_success'), type: 'success' }));
    dispatch(closeRegisterModal());
    dispatch(turnOffReCaptchaRegister());
    return jsonData;
  }
});
