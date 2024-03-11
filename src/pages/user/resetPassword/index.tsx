import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import * as Yup from 'yup';

import TInput from 'components/input';
import TBox from 'components/box';
import TTypography from 'components/typography';
import TButton from 'components/button';

import { openLoginModal } from 'store/slices/auth';
import { setLoading } from 'store/slices/common';
import { setAlert } from 'store/slices/alert';
import { setHelmet } from 'store/slices/helmet';

import fetchDataWithoutCredential from 'utils/fetchDataWithCredential';

import { USER_ENDPOINT } from 'constants/apiEndPoint';

export type TMatchParamsTResetPassword = {
  tokenRestore?: string;
};

const TResetPassword = ({ match }: RouteComponentProps<TMatchParamsTResetPassword>) => {
  const [accountResetPasswordSuccess, setAccountResetPasswordSuccess] = React.useState('');
  const { tokenRestore } = match.params;
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const initialValue = {
    password: '',
    reEnterPassword: '',
  };
  const RegisterSchema = Yup.object().shape({
    password: Yup.string()
      .trim(t('password_are_not_valid'))
      .min(8, t('password_are_not_valid'))
      .max(50, t('password_are_not_valid'))
      .required(t('password_are_not_valid')),
    reEnterPassword: Yup.string()
      .trim(t('password_are_not_valid'))
      .oneOf([Yup.ref('password')], t('password_are_not_match'))
      .required(t('password_are_not_valid')),
  });

  useEffect(() => {
    dispatch(setHelmet({ title: t('reset_password') }));
  }, []);

  return !!accountResetPasswordSuccess ? (
    <TBox display="flex" flexDirection="column" alignItems="center" justifyContent="center" marginbottom={2}>
      <TTypography variant="h6" marginbottom={2}>
        {t('reset_password_success_for_account', { account: accountResetPasswordSuccess })}
      </TTypography>
      <TButton variant="contained" onClick={() => dispatch(openLoginModal(true))}>
        {t('login')}
      </TButton>
    </TBox>
  ) : (
    <Formik
      initialValues={initialValue}
      onSubmit={(values, actions) => {
        const { password } = values;

        dispatch(setLoading(true));
        fetchDataWithoutCredential({
          url: USER_ENDPOINT.RESET_PASSWORD,
          method: 'POST',
          body: { password },
        })
          .then((response) => {
            if (response.status >= 400) {
              throw new Error();
            }
            return response.json();
          })
          .then((data) => {
            setAccountResetPasswordSuccess(data.account || 'account');
          })
          .catch(() => {
            dispatch(setAlert({ type: 'error', title: t('error'), message: t('reset_password_faled') }));
          });
        dispatch(setLoading(false));
        actions.setSubmitting(false);
      }}
      validationSchema={RegisterSchema}
    >
      {({ errors, touched, handleChange }) => {
        return (
          <Form>
            <TBox display="flex" flexDirection="column">
              <TInput
                marginbottom={2}
                name="password"
                type="password"
                label={t('password')}
                placeholder={t('password')}
                error={!!touched.password && !!errors.password}
                onMouseDown={() => (touched.password = true)}
                helperText={touched.password && errors.password}
                onChange={handleChange}
              />
              <TInput
                marginbottom={2}
                name="reEnterPassword"
                type="password"
                label={t('re_enter_password')}
                placeholder={t('re_enter_password')}
                error={!!touched.reEnterPassword && !!errors.reEnterPassword}
                onMouseDown={() => (touched.reEnterPassword = true)}
                helperText={touched.reEnterPassword && errors.reEnterPassword}
                onChange={handleChange}
              />
              <TButton type="submit" variant="contained" marginbottom={3}>
                {t('reset_password')}
              </TButton>
            </TBox>
          </Form>
        );
      }}
    </Formik>
  );
};

export default TResetPassword;
