import React from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import * as Yup from 'yup';

import TModal from 'components/modal';
import TInput from 'components/input';
import TBox from 'components/box';
import TTypography from 'components/typography';
import TButton from 'components/button';

import { openLoginModal, openRegisterModal } from 'store/slices/auth';
import { register } from 'store/thunk/auth';
import ReCAPTCHA from 'react-google-recaptcha';

const TRegisterModal = () => {
  const isOpenRegisterModal = useSelector((state: RootState) => state.auth.isOpenRegisterModal);
  const turnOnReCaptchaRegister = useSelector((state: RootState) => state.auth.turnOnReCaptchaRegister);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const initialValue = {
    account: '',
    password: '',
    email: '',
    reEnterPassword: '',
    recaptcha: 'done',
  };
  const RegisterSchema = Yup.object().shape({
    account: Yup.string()
      .trim(t('accounr_not_valid'))
      .min(5, t('accounr_not_valid'))
      .max(50, t('accounr_not_valid'))
      .required(t('accounr_not_valid')),
    email: Yup.string().email(t('email_not_valid')),
    password: Yup.string()
      .trim(t('password_are_not_valid'))
      .min(8, t('password_are_not_valid'))
      .max(50, t('password_are_not_valid'))
      .required(t('password_are_not_valid')),
    reEnterPassword: Yup.string()
      .trim(t('password_are_not_valid'))
      .oneOf([Yup.ref('password')], t('password_are_not_match'))
      .required(t('password_are_not_valid')),
    recaptcha: Yup.string().required(t('recaptcha_required')),
  });

  const handleCloseRegisterModal = () => {
    dispatch(openRegisterModal(false));
  };

  return (
    <TModal open={isOpenRegisterModal} title={t('register_to_TChat')} onClose={handleCloseRegisterModal}>
      <Formik
        initialValues={initialValue}
        onSubmit={(values, actions) => {
          const { account, password, email } = values;
          dispatch(register({ account, password, email }));
          actions.setSubmitting(false);
        }}
        validationSchema={RegisterSchema}
      >
        {({ errors, touched, handleChange, setFieldValue }) => {
          return (
            <Form>
              <TBox display="flex" flexDirection="column">
                <TInput
                  marginbottom={2}
                  name="account"
                  label={t('account')}
                  placeholder={t('account')}
                  error={!!touched.account && !!errors.account}
                  onMouseDown={() => (touched.account = true)}
                  helperText={touched.account && errors.account}
                  onChange={handleChange}
                />
                <TInput
                  marginbottom={2}
                  name="email"
                  label={t('email')}
                  placeholder={t('email')}
                  error={!!touched.email && !!errors.email}
                  onMouseDown={() => (touched.email = true)}
                  helperText={touched.email && errors.email}
                  onChange={handleChange}
                />
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
                {turnOnReCaptchaRegister && (
                  <>
                    <ReCAPTCHA
                      sitekey="6LcxUo4eAAAAACeuXLHxJaH1TTR9S7LXy_jPqn-x"
                      asyncScriptOnLoad={() => {
                        setFieldValue('recaptcha', '');
                      }}
                      onChange={() => {
                        setFieldValue('recaptcha', 'done');
                      }}
                    />
                    {!!errors.recaptcha && (
                      <TTypography color="error" variant="body2" margintop={2}>
                        {errors.recaptcha}
                      </TTypography>
                    )}
                  </>
                )}
                <TButton type="submit" variant="contained" marginbottom={3}>
                  {t('register')}
                </TButton>
                <TBox display="flex" marginbottom={2} alignItems="center">
                  <TTypography variant="caption" color="textSecondary">
                    {t('you_already_have_an_account')}
                  </TTypography>
                  <TButton onClick={() => dispatch(openLoginModal(true))}>{t('login_here')}</TButton>
                </TBox>
              </TBox>
            </Form>
          );
        }}
      </Formik>
    </TModal>
  );
};

export default TRegisterModal;
