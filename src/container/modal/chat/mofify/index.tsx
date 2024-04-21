import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Formik, Form } from 'formik';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import range from 'lodash/range';
import io from 'socket.io-client';

import TModal from 'components/modal';
import TInput from 'components/input';
import TGrid from 'components/grid';
import TSelect from 'components/select';
import { Autocomplete } from '@mui/material';
import union from 'lodash/union';
import TButton from 'components/button';
import { TRoomsProps } from 'pages/chat';

import { setLoading } from 'store/slices/common';
import { CHAT_CHANNELS } from 'constants/socketChanel';
import fetchDataWithoutCredential from 'utils/fetchDataWithCredential';
import { ROOM_ENDPOINT } from 'constants/apiEndPoint';
import { setAlert } from 'store/slices/alert';

const socket = io(process.env.REACT_APP_API_URL + '');

export type TModifyChatRoomProps = {
  title?: string;
  open: boolean;
  onClose: () => void;
  selectedRoomData?: TRoomsProps;
};

type CreateDataProps = { maximum: number; tags: string[] };

const TModifyChatRoom = ({ selectedRoomData, ...props }: TModifyChatRoomProps) => {
  const [tagOptions, setTagOptions] = useState<Array<string> | []>([]);
  const [topicValue, setTopicValue] = useState(() => selectedRoomData?.topic);
  const [initialValue, setInitialValue] = useState(() => ({
    maximum: selectedRoomData?.maximum || 1,
    tags: selectedRoomData?.tags || [],
  }));

  const { t } = useTranslation();
  const selectMaximumUsers = range(1, 9);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (selectedRoomData) {
      setTopicValue(selectedRoomData.topic || '');
    }
    setInitialValue({
      maximum: selectedRoomData?.maximum || 1,
      tags: selectedRoomData?.tags || [],
    });
  }, [selectedRoomData]);

  const handleUpdateData = (selectedRoomData: TRoomsProps, { maximum, tags }: CreateDataProps) => {
    fetchDataWithoutCredential({
      url: ROOM_ENDPOINT.UPDATE(selectedRoomData._id!),
      method: 'POST',
      body: { tokenUser: localStorage.getItem('tokenUser'), maximum, tags, topic: topicValue },
    })
      .then((res) => {
        if (res.status >= 400) {
          return Promise.reject(new Error());
        }
        return res.json();
      })
      .then((res) => {
        dispatch(setLoading(false));
        socket.emit(CHAT_CHANNELS.NOTICE_CHATROOM_UPDATED_STATUS, res);
        dispatch(setAlert({ title: t('success'), message: t('update_data_success'), type: 'error' }));
      })
      .catch(() => {
        dispatch(setAlert({ title: t('error'), message: t('load_data_failed'), type: 'error' }));
        dispatch(setLoading(false));
      });
  };

  const handleCreateData = ({ maximum, tags }: CreateDataProps) => {
    fetchDataWithoutCredential({
      url: ROOM_ENDPOINT.CREATE,
      method: 'POST',
      body: { tokenUser: localStorage.getItem('tokenUser'), maximum, tags, topic: topicValue },
    })
      .then((res) => {
        if (res.status >= 400) {
          return Promise.reject(new Error());
        }
        return res.json();
      })
      .then((res) => {
        dispatch(setLoading(false));
        socket.emit(CHAT_CHANNELS.NOTICE_CHATROOM_UPDATED_STATUS, res);
        setTimeout(() => {
          history.push('/room-chat/' + res);
        }, 1000);
      })
      .catch(() => dispatch(setLoading(false)));
    setTopicValue('');
  };
  return (
    <TModal {...props} width="80vw">
      <Formik
        initialValues={initialValue}
        onSubmit={(values) => {
          const { maximum, tags } = values;
          dispatch(setLoading(true));
          if (selectedRoomData) {
            handleUpdateData(selectedRoomData, { maximum, tags });
          } else {
            handleCreateData({ maximum, tags });
          }
        }}
      >
        {({ values, setFieldValue, handleChange }) => (
          <Form>
            <TGrid container spacing={2}>
              <TGrid item xs={12} md={8}>
                <Autocomplete
                  multiple
                  options={tagOptions}
                  limitTags={3}
                  getOptionLabel={(option) => option}
                  filterSelectedOptions
                  onChange={(event, value) => setFieldValue('tags', value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      event.preventDefault();
                      const currentTag = (event.target as HTMLInputElement).value;
                      const newTagOptions = union(tagOptions, [currentTag]);
                      setTagOptions([...newTagOptions]);
                    }
                  }}
                  fullWidth
                  renderInput={(params) => <TInput {...params} label={t('tags')} placeholder={t('tags')} />}
                />
              </TGrid>
              <TGrid item xs={12} md={4}>
                <TSelect
                  variant="outlined"
                  label={t('maximum_people')}
                  name="maximum"
                  onChange={handleChange}
                  value={values.maximum}
                  formControlProps={{
                    width: '100%',
                  }}
                >
                  {selectMaximumUsers.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </TSelect>
              </TGrid>
              <TGrid item xs={12}>
                <TInput
                  label={t('topic')}
                  name="topic"
                  value={topicValue}
                  onChange={(event) => setTopicValue(event.target.value)}
                  error={!topicValue?.trim()}
                  helperText={!topicValue?.trim() && t('topic_is_required')}
                  fullWidth
                />
              </TGrid>
              <TGrid item xs={12} textAlign="center">
                <TButton type="submit" disabled={!topicValue} variant="contained">
                  {selectedRoomData ? t('update') : t('create')}
                </TButton>
              </TGrid>
            </TGrid>
          </Form>
        )}
      </Formik>
    </TModal>
  );
};

export default TModifyChatRoom;
