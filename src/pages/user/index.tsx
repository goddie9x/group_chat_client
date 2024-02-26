import React, { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { RootState } from 'store';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import TBox from 'components/box';
import TButton from 'components/button';
import TCard from 'components/card';
import TGrid from 'components/grid';
import TTypography from 'components/typography';
import TInputTransformText from 'components/transform/inputAndText';
import { MenuItem, useTheme } from '@mui/material';
import TDivider from 'components/divider';

import { setLoading, triggerReloadHeader } from 'store/slices/common';
import { setAlert } from 'store/slices/alert';

import { UserDataSchema } from 'store/slices/auth';
import { getCurrentUserData } from 'store/thunk/auth';
import TImagePicker from 'components/imagePicker';
import { setHelmet } from 'store/slices/helmet';
import { onSaveProps } from 'components/imagePicker/imagePicker.styled';
import TInput from 'components/input';
import TSelect from 'components/select';
import fetchDataWithCredential from 'utils/fetchDataWithCredential';
import { USER_ENDPOINT } from 'constants/apiEndPoint';

export type TMatchParamsTViewUser = {
  _id?: string;
};
const Genders = ['male', 'female', 'other'];

const TViewUser = (props: RouteComponentProps<TMatchParamsTViewUser>) => {
  const { _id } = props.match.params;
  const currentUser = useSelector((state: RootState) => state.auth.userData);
  const currentUserId = currentUser?._id;
  const [user, setUser] = useState<UserDataSchema>({} as UserDataSchema);
  const [editable, setEditable] = useState(false);
  const [editing, setEditing] = useState(false);
  const [triggerReloadData, setTriggerReloadData] = useState(false);
  const theme = useTheme();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const initialValue = {
    fullName: user.fullName,
    email: user.email?.length ? user.email : [''],
    phone: user.phone?.length ? user.phone : [''],
    address: user.address,
    gender: user.gender,
    dateOfBirth: user.dateOfBirth,
    subDescription: user.subDescription,
    description: user.description,
    quote: user.quote,
  };
  const UserSchema = Yup.object().shape({
    fullName: Yup.string().test('validate_name', t('field_not_valid'), (value) => !value || value.length > 5),
    email: Yup.array().of(Yup.string().email(t('email_not_valid'))),
    phone: Yup.array().of(
      Yup.string().test(
        'validate_phone',
        t('field_not_valid'),
        (value) => !value || /((09|03|07|08|05)+([0-9]{8})\b)/.test(value),
      ),
    ),
  });
  const handleSaveImage = ({ file, imageUrl }: onSaveProps) => {
    dispatch(setLoading(true));
    if (imageUrl) {
      dispatch(setLoading(true));
      fetchDataWithCredential({
        url: USER_ENDPOINT.USER_BY_ID + _id,
        method: 'PATCH',
        body: { image: imageUrl, tokenUser: localStorage.getItem('tokenUser') },
      })
        .then((res) => {
          if (res.status >= 400) {
            throw new Error(res.status.toString());
          }
          dispatch(setLoading(false));
          setTriggerReloadData((prev) => !prev);
          dispatch(setAlert({ type: 'success', message: t('upload_image_success'), title: t('success') }));
          dispatch(triggerReloadHeader());
        })
        .catch((err) => {
          if (err < 500) {
            dispatch(setAlert({ type: 'error', message: t('error_occurred'), title: t('error') }));
          } else {
            dispatch(setAlert({ type: 'error', message: t('error_occurred'), title: t('error') }));
          }
          dispatch(setLoading(false));
        });
      return;
    }
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('tokenUser', localStorage.getItem('tokenUser') || '');

      fetch(USER_ENDPOINT.UPDATE_USER_AVATER + _id, {
        method: 'PATCH',
        body: formData,
      })
        .then((res) => {
          if (res.status >= 400) {
            throw new Error();
          }
          dispatch(setLoading(false));
          dispatch(setAlert({ type: 'success', message: t('upload_image_success'), title: t('success') }));
          dispatch(getCurrentUserData());
          dispatch(triggerReloadHeader());
        })
        .catch(() => {
          dispatch(setLoading(false));
          dispatch(setAlert({ type: 'error', message: t('error_occurred'), title: t('error') }));
        });
    }
  };
  const handleBanUser = () => {
    dispatch(setLoading(true));
    fetchDataWithCredential({
      url: USER_ENDPOINT.BAN_USER + _id,
      method: 'POST',
      body: { tokenUser: localStorage.getItem('tokenUser') },
    })
      .then((res) => {
        if (res.status >= 400) {
          throw new Error();
        }
        dispatch(setLoading(false));
        dispatch(setAlert({ type: 'success', message: t('user_ban_successfully'), title: t('success') }));
        setTriggerReloadData(!triggerReloadData);
      })
      .catch(() => {
        dispatch(setLoading(false));
        dispatch(setAlert({ type: 'error', message: t('user_ban_failed'), title: t('error') }));
      });
  };
  useEffect(() => {
    let isSubscribed = true;

    fetch(USER_ENDPOINT.USER_BY_ID + _id)
      .then((res) => {
        if (res.status >= 400) {
          throw new Error();
        }
        return res.json();
      })
      .then((data) => {
        if (isSubscribed) {
          setUser({ ...data });
        }
      })
      .catch(() => {
        if (isSubscribed) {
          props.history.push('/404');
        }
      });
    return () => {
      isSubscribed = false;
    };
  }, [_id, triggerReloadData]);
  useEffect(() => {
    if (currentUserId === user?._id) {
      setEditable(true);
    } else {
      setEditable(false);
    }
  }, [currentUserId, user]);
  useEffect(() => {
    dispatch(
      setHelmet({
        title: user?.fullName,
        description: user?.subDescription,
        image: user?.image,
      }),
    );
  }, [user]);
  return user?.deleted ? (
    <TTypography variant="h3" color="error" textalign="center" marginY={10}>
      {t('account_has_been_banned', { account: user?.fullName || user.account })}
    </TTypography>
  ) : (
    <TGrid container position="relative">
      {currentUser && currentUser.role < 2 && currentUser.role < user.role && (
        <TButton onClick={handleBanUser} position="absolute" color="error" variant="contained" top={-1} right={10}>
          {t('ban_this_user')}
        </TButton>
      )}
      <TGrid item xs={12} md={6} lg={4} padding={1}>
        <TCard textAlign="center" padding={3} borderradius={1}>
          <TImagePicker
            margintop={2}
            marginbottom={2}
            variant="circle"
            src={user.image || '/images/default.png'}
            imageProps={{
              alt: (user.fullName as string) || (user.account as string),
            }}
            allowBrowse={user.role < 2}
            editable={editable}
            width={300}
            onSave={handleSaveImage}
          />
          {!!user?.fullName && (
            <TTypography variant="h4" marginY={2}>
              {user?.fullName}
            </TTypography>
          )}
          {!!user?.address && (
            <TTypography variant="h6" marginY={2}>
              {user?.address}
            </TTypography>
          )}
          {!!user?.quote && (
            <TTypography variant="body1" marginY={2}>
              {user?.quote}
            </TTypography>
          )}
          {!editable && (
            <TBox display="flex" justifyContent="center" marginY={2}>
              <TButton variant="contained" marginright={3}>
                {t('follow')}
              </TButton>
              <TButton variant="outlined">{t('send_message')}</TButton>
            </TBox>
          )}
        </TCard>
      </TGrid>
      <TGrid item xs={12} md={6} lg={8} padding={1}>
        <TBox background={theme.palette.background.default} padding={3} borderradius={1}>
          <Formik
            initialValues={initialValue}
            onSubmit={(values) => {
              dispatch(setLoading(true));
              fetchDataWithCredential({
                url: USER_ENDPOINT.USER_BY_ID + _id,
                method: 'PATCH',
                body: { ...values, tokenUser: localStorage.getItem('tokenUser') },
              })
                .then((res) => {
                  if (res.status >= 400) {
                    throw new Error(res.status.toString());
                  }
                  return res.json();
                })
                .then((data) => {
                  setUser(data);
                  setEditing(false);
                  dispatch(setLoading(false));
                  dispatch(setAlert({ type: 'success', message: t('update_data_success'), title: t('success') }));
                  setTriggerReloadData((prev) => !prev);
                })
                .catch((err) => {
                  if (err < 500) {
                    dispatch(setAlert({ type: 'error', message: t('error_occurred'), title: t('error') }));
                  } else {
                    dispatch(setAlert({ type: 'error', message: t('error_occurred'), title: t('error') }));
                  }
                  dispatch(setLoading(false));
                  setTriggerReloadData((prev) => !prev);
                });
            }}
            enableReinitialize
            validationSchema={UserSchema}
          >
            {({ values, errors, handleChange, setFieldValue }) => (
              <Form>
                {editing && (
                  <TInput
                    label={t('full_name')}
                    error={!!errors.fullName}
                    name="fullName"
                    value={values.fullName}
                    onChange={handleChange}
                    helperText={errors.fullName}
                    margintop={1}
                    marginbottom={1}
                    width="100%"
                  />
                )}
                {values.email &&
                  values.email.map((value, index) => (
                    <Fragment key={index}>
                      <TGrid container alignItems="center">
                        <TGrid item xs={editing ? 6 : 12} sm={editing ? 9 : 12} md={editing ? 6 : 12} lg={editing ? 9 : 12}>
                          <TInputTransformText
                            label={t('email') + ' ' + (index + 1)}
                            error={!!errors.email && !!errors.email[index]}
                            name={'email' + index}
                            currentType={editing ? 'input' : 'text'}
                            value={value}
                            onChange={(e) => {
                              const newEmailList = values.email ? [...values.email] : [];
                              newEmailList[index] = e.target.value;
                              handleChange(e);
                              setFieldValue('email', newEmailList);
                            }}
                            helperText={!!errors.email && errors.email[index]}
                            containerProps={{
                              margintop: 1,
                              marginbottom: 1,
                            }}
                            width="100%"
                          />
                        </TGrid>
                        {!!editing && (
                          <>
                            <TGrid item xs={3} sm={1.5} md={3} lg={1.5} textalign="center">
                              <TButton
                                minwidth={7}
                                paddingleft={2.5}
                                paddingright={2.5}
                                variant="outlined"
                                color="secondary"
                                onClick={() => {
                                  const newEmailList = values.email ? [...values.email] : [];
                                  newEmailList.splice(index, 1, value, '');
                                  setFieldValue('email', newEmailList);
                                }}
                              >
                                {t('add')}
                              </TButton>
                            </TGrid>
                            <TGrid item xs={3} sm={1.5} md={3} lg={1.5} textalign="center">
                              <TButton
                                minwidth={7}
                                paddingleft={2.5}
                                paddingright={2.5}
                                variant="outlined"
                                color="error"
                                onClick={() => {
                                  const newEmailList = values.email ? [...values.email] : [];
                                  newEmailList.splice(index, 1);
                                  setFieldValue('email', newEmailList);
                                }}
                              >
                                {t('delete')}
                              </TButton>
                            </TGrid>
                          </>
                        )}
                      </TGrid>
                      {!editing && <TDivider />}
                    </Fragment>
                  ))}
                {!editing && <TDivider />}
                {values.phone &&
                  values.phone.map((value, index) => (
                    <Fragment key={index}>
                      <TGrid container alignItems="center">
                        <TGrid item xs={editing ? 6 : 12} sm={editing ? 9 : 12} md={editing ? 6 : 12} lg={editing ? 9 : 12}>
                          <TInputTransformText
                            label={t('phone') + ' ' + (index + 1)}
                            error={!!errors.phone && !!errors.phone[index]}
                            name={'phone' + index}
                            currentType={editing ? 'input' : 'text'}
                            value={value}
                            onChange={(e) => {
                              const newPhoneList = values.phone ? [...values.phone] : [];
                              newPhoneList[index] = e.target.value;
                              handleChange(e);
                              setFieldValue('phone', newPhoneList);
                            }}
                            helperText={errors.phone}
                            containerProps={{
                              margintop: 1,
                              marginbottom: 1,
                            }}
                            width="100%"
                          />
                        </TGrid>
                        {!!editing && (
                          <>
                            <TGrid item xs={3} sm={1.5} md={3} lg={1.5} textalign="center">
                              <TButton
                                variant="outlined"
                                color="secondary"
                                minwidth={7}
                                paddingleft={2.5}
                                paddingright={2.5}
                                onClick={() => {
                                  const newPhoneList = values.phone ? [...values.phone] : [];
                                  newPhoneList.splice(index, 1, value, '');
                                  setFieldValue('phone', newPhoneList);
                                }}
                              >
                                {t('add')}
                              </TButton>
                            </TGrid>
                            <TGrid item xs={3} sm={1.5} md={3} lg={1.5} textalign="center">
                              <TButton
                                variant="outlined"
                                color="error"
                                minwidth={7}
                                paddingleft={2.5}
                                paddingright={2.5}
                                onClick={() => {
                                  const newPhoneList = values.phone ? [...values.phone] : [];
                                  newPhoneList.splice(index, 1);
                                  setFieldValue('phone', newPhoneList);
                                }}
                              >
                                {t('delete')}
                              </TButton>
                            </TGrid>
                          </>
                        )}
                      </TGrid>
                      {!editing && <TDivider />}
                    </Fragment>
                  ))}
                {!editing && <TDivider />}
                {editing && (
                  <>
                    <TInput
                      label={t('address')}
                      name="address"
                      value={values.address}
                      onChange={handleChange}
                      margintop={1}
                      marginbottom={1}
                      width="100%"
                    />
                    {!editing && <TDivider />}
                  </>
                )}
                <TInputTransformText
                  label={t('date_of_birth')}
                  name="dateOfBirth"
                  type="date"
                  currentType={editing ? 'input' : 'text'}
                  value={values.dateOfBirth}
                  onChange={handleChange}
                  containerProps={{
                    margintop: 1,
                    marginbottom: 1,
                  }}
                  width="100%"
                />
                {editing ? (
                  <TSelect
                    label={t('gender')}
                    name="gender"
                    onChange={handleChange}
                    value={values.gender}
                    formControlProps={{
                      width: '100%',
                    }}
                  >
                    {Genders.map((gender, index) => (
                      <MenuItem key={index} value={t(gender)}>
                        {t(gender)}
                      </MenuItem>
                    ))}
                  </TSelect>
                ) : (
                  <>
                    <TDivider />
                    <TGrid container alignItems="center" minHeight={40} marginY={1.5}>
                      <TGrid item sm={3} xs={12}>
                        <TTypography>{t('gender')}: </TTypography>
                      </TGrid>
                      <TGrid item sm={9} xs={12}>
                        <TTypography overflowWrap="break-word">{values.gender}</TTypography>
                      </TGrid>
                    </TGrid>
                  </>
                )}
                {!editing && <TDivider />}
                <TInputTransformText
                  label={t('description')}
                  name="description"
                  currentType={editing ? 'input' : 'text'}
                  value={values.description}
                  onChange={handleChange}
                  multiline
                  containerProps={{
                    margintop: 2,
                    marginbottom: 2,
                  }}
                  width="100%"
                />
                {!editing && <TDivider />}
                <TInputTransformText
                  label={t('sub_description')}
                  name="subDescription"
                  currentType={editing ? 'input' : 'text'}
                  value={values.subDescription}
                  multiline
                  onChange={handleChange}
                  containerProps={{
                    margintop: 2,
                    marginbottom: 2,
                  }}
                  width="100%"
                />
                {!editing && <TDivider />}
                {editing && (
                  <TInput
                    label={t('quote')}
                    name="quote"
                    value={values.quote}
                    onChange={handleChange}
                    margintop={1}
                    marginbottom={1}
                    multiline
                    width="100%"
                  />
                )}
                {!editing && <TDivider />}
                {editing && (
                  <TBox>
                    <TButton type="submit" variant="contained" marginright={5}>
                      {t('save')}
                    </TButton>
                    <TButton
                      variant="contained"
                      onClick={() => {
                        setEditing(false);
                        setFieldValue('name', user.name);
                        setFieldValue('email', user.email?.length ? user.email : ['']);
                        setFieldValue('phone', user.phone?.length ? user.phone : ['']);
                        setFieldValue('dateOfBirth', user.dateOfBirth);
                        setFieldValue('description', user.description);
                        setFieldValue('subDescription', user.subDescription);
                        setFieldValue('quote', user.quote);
                      }}
                    >
                      {t('cancel')}
                    </TButton>
                  </TBox>
                )}
              </Form>
            )}
          </Formik>
          {editable && !editing && (
            <TBox margintop={2}>
              <TButton variant="contained" onClick={() => setEditing(true)}>
                {t('edit')}
              </TButton>
            </TBox>
          )}
        </TBox>
      </TGrid>
    </TGrid>
  );
};

export default TViewUser;
