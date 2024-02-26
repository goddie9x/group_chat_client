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

import { openLoginModal, openResetPasswordModal } from 'store/slices/auth';
import { sendEmailResetPassword } from 'store/thunk/auth';

const TResetPasswordModal = () => {
  const isOpenResetPasswordModal = useSelector((state: RootState) => state.auth.isOpenResetPasswordModal);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const initialValue = {
    email: '',
  };
  const RegisterSchema = Yup.object().shape({
    email: Yup.string().matches(
      /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/,
      t('email_not_valid'),
    ),
  });

  const handleCloseResetPasswordModal = () => {
    dispatch(openResetPasswordModal(false));
  };

  return (
    <TModal open={isOpenResetPasswordModal} title={t('reset_password')} onClose={handleCloseResetPasswordModal}>
      <>
        <TTypography variant="h6" marginbottom={2}width="100%">{t('you_will_receive_email_with_link_to_reset_password_please_check_inbox')}</TTypography>
        <Formik
          initialValues={initialValue}
          onSubmit={(values, actions) => {
            const { email } = values;
            dispatch(sendEmailResetPassword({ email }));
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
                    name="email"
                    label={t('email')}
                    placeholder={t('email')}
                    error={!!touched.email && !!errors.email}
                    onMouseDown={() => (touched.email = true)}
                    helperText={touched.email && errors.email}
                    onChange={handleChange}
                  />
                  <TButton type="submit" variant="contained" marginbottom={3}>
                    {t('reset_password')}
                  </TButton>
                  <TBox display="flex" marginbottom={2} alignItems="center">
                    <TTypography variant="caption" color="textSecondary">
                      {t('you_aready_reset_password')}
                    </TTypography>
                    <TButton onClick={() => dispatch(openLoginModal(true))}>{t('login_here')}</TButton>
                  </TBox>
                </TBox>
              </Form>
            );
          }}
        </Formik>
      </>
    </TModal>
  );
};

export default TResetPasswordModal;
