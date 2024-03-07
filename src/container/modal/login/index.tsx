import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
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

import { openRegisterModal, openLoginModal, openResetPasswordModal } from 'store/slices/auth';
import { login } from 'store/thunk/auth';

const TLoginModal = () => {
  const isOpenLoginModal = useSelector((state: RootState) => state.auth.isOpenLoginModal);
  const turnOnReCaptchaLogin = useSelector((state: RootState) => state.auth.turnOnReCaptchaLogin);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const initialValue = {
    account: '',
    password: '',
    recaptcha: 'done',
  };
  const LoginSchema = Yup.object().shape({
    account: Yup.string()
      .trim(t('accounr_not_valid'))
      .min(5, t('accounr_not_valid'))
      .max(50, t('accounr_not_valid'))
      .required(t('accounr_not_valid')),
    password: Yup.string()
      .trim(t('password_are_not_valid'))
      .min(8, t('password_are_not_valid'))
      .max(50, t('password_are_not_valid'))
      .required(t('password_are_not_valid')),
    recaptcha: Yup.string().required(t('recaptcha_required')),
  });

  const handleCloseLoginModal = () => {
    dispatch(openLoginModal(false));
  };

  const handleOpenResetPasswordModal = () => {
    dispatch(openResetPasswordModal(true));
  };

  return (
    <TModal open={isOpenLoginModal} title={t('login_to_TChat')} onClose={handleCloseLoginModal}>
      <Formik
        initialValues={initialValue}
        onSubmit={(values, actions) => {
          const { account, password } = values;

          dispatch(login({ account, password }));
          actions.setSubmitting(false);
        }}
        validationSchema={LoginSchema}
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
                  type="password"
                  name="password"
                  label={t('password')}
                  placeholder={t('password')}
                  error={!!touched.password && !!errors.password}
                  onMouseDown={() => (touched.password = true)}
                  helperText={touched.password && errors.password}
                  onChange={handleChange}
                />
                {turnOnReCaptchaLogin && (
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
                <TBox display="flex" marginbottom={2} alignItems="center">
                  <TButton onClick={handleOpenResetPasswordModal}>{t('forgot_password')}</TButton>
                </TBox>
                <TButton type="submit" variant="contained" marginbottom={3}>
                  {t('login')}
                </TButton>
                <TBox display="flex" marginbottom={2} alignItems="center">
                  <TTypography variant="caption" color="textSecondary">
                    {t('you_don_not_have_an_account')}
                  </TTypography>
                  <TButton onClick={() => dispatch(openRegisterModal(true))}>{t('register_here')}</TButton>
                </TBox>
              </TBox>
            </Form>
          );
        }}
      </Formik>
    </TModal>
  );
};

export default TLoginModal;
