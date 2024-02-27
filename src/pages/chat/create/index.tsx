import React, { useState } from 'react';
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

import { setLoading } from 'store/slices/common';

const socket = io(process.env.REACT_APP_API_URL+'');

export type TCreateChatRoomSchema = {
  topic?: string;
  maximum?: number;
  tags?: Array<string>;
};
export type TCreateChatRoomProps = {
  title?: string;
  open: boolean;
  onClose: () => void;
  updateData?: TCreateChatRoomSchema;
};
const TCreateChatRoom = ({ updateData, ...props }: TCreateChatRoomProps) => {
  const [tagOptions, setTagOptions] = useState<Array<string> | []>([]);
  const [topicValue, setTopicValue] = useState(updateData?.topic || '');

  const { t } = useTranslation();
  const selectMaximumUsers = range(1, 9);
  const dispatch = useDispatch();
  const history = useHistory();

  const initialValue = {
    maximum: updateData?.maximum || 1,
    tags: updateData?.tags || [],
  };
  return (
    <TModal {...props} width="80vw">
      <Formik
        initialValues={initialValue}
        onSubmit={(values) => {
          const { maximum, tags } = values;
          dispatch(setLoading(true));
          fetch(process.env.REACT_APP_API_URL+'/chat-room/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tokenUser: localStorage.getItem('tokenUser'), maximum, tags, topic: topicValue }),
          })
            .then((res) => {
              if (res.status >= 400) {
                throw new Error('Error');
              }
              return res.json();
            })
            .then((res) => {
              dispatch(setLoading(false));
              socket.emit('chat-room:updated', res);
              setTimeout(() => {
                history.push('/room-chat/' + res);
              }, 1000);
            })
            .catch(() => dispatch(setLoading(false)));
          setTopicValue('');
        }}
      >
        {({ values, setFieldValue, handleChange }) => (
          <Form>
            <TGrid container spacing={2}>
              <TGrid item xs={12} md={8}>
                <Autocomplete
                  multiple
                  options={tagOptions}
                  defaultValue={values.tags}
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
                  error={!topicValue.trim()}
                  helperText={!topicValue.trim() && t('topic_is_required')}
                  fullWidth
                />
              </TGrid>
              <TGrid item xs={12} textAlign="center">
                <TButton type="submit" disabled={!topicValue} variant="contained">
                  {t('create')}
                </TButton>
              </TGrid>
            </TGrid>
          </Form>
        )}
      </Formik>
    </TModal>
  );
};

export default TCreateChatRoom;
