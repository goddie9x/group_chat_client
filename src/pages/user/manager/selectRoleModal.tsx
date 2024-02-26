import React from 'react';

import TModal from 'components/modal';
import TBox from 'components/box';
import TSelect from 'components/select';
import TButton from 'components/button';
import { useTranslation } from 'react-i18next';
import { userRoles } from '.';
import MenuItem from '@mui/material/MenuItem';

export type TSelectRoleModalProps = {
  isOpen: boolean;
  onClose: () => void;
  currenRole?: number;
  onSelect: (role: number) => void;
};

const TSelectRoleModal = ({ isOpen, currenRole, onClose, onSelect }: TSelectRoleModalProps) => {
  const { t } = useTranslation();

  return (
    <TModal open={isOpen} title={t('select_role')} onClose={onClose}>
      <TBox textalign="center">
        <TSelect
          label={t('select_role')}
          value={currenRole || 3}
          onChange={(e) => onSelect(e.target.value as number)}
          formControlProps={{
            width: '100%',
          }}
        >
          {userRoles.map((role, index) => (
            <MenuItem key={index} value={index}>
              {role}
            </MenuItem>
          ))}
        </TSelect>
        <TButton variant="contained" color="primary" margintop={2} onClick={() => onClose()}>
          {t('confirm')}
        </TButton>
      </TBox>
    </TModal>
  );
};

export default TSelectRoleModal;
