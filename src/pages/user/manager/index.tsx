import React, { useEffect, useState, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Checkbox, MenuItem } from '@mui/material';
import { useHistory } from 'react-router-dom';

import TTable, { TTableColumnData } from 'components/table';
import TBox from 'components/box';
import TLink from 'components/link';
import TTypography from 'components/typography';
import TSelect from 'components/select';
import TButton from 'components/button';
import TFormControlLabel from 'components/formControlLabel';

import { setLoading } from 'store/slices/common';
import { setAlert } from 'store/slices/alert';
import { RootState } from 'store';
import { setHelmet } from 'store/slices/helmet';
import TSelectRoleModal from './selectRoleModal';

export type TUsersManagerProps = {
  store?: string;
};

export type TUsersManagerRowProps = {
  _id: string;
  account: string;
  fullName?: string;
  //0: god, 1: admin, 2: classmate, 3: normal users
  role: number;
};
export const userRoles = ['god', 'admin', 'classmate', 'normal user'];

const TUsersManager = ({ store }: TUsersManagerProps) => {
  const [page, setPage] = useState(1);
  const [roleSelected, setRoleSelected] = useState(3);
  const [openSelectRoleModal, setOpenSelectRoleModal] = useState(false);
  const [userIdChangingRole, setUserIdChangingRole] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalUsers, setTotalUsers] = useState(0);
  const [rows, setRows] = useState<Array<TUsersManagerRowProps>>([]);
  const [selectedRowID, setSelectedRowID] = useState<Array<string>>([]);
  const [actionSelected, setActionSelected] = useState<string>('delete');
  const [opositeStoredCount, setOpositeStoredCount] = useState(0);
  const [triggerReloadData, setTriggerReloadData] = useState(false);
  const userData = useSelector((state: RootState) => state.auth.userData);
  const currentPage = store === 'banned' ? 'banned/' : 'manager/';

  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentCheckBox = event.target;
    const checked = currentCheckBox.checked;
    const id = currentCheckBox.value;
    if (checked) {
      setSelectedRowID([...selectedRowID, id]);
    } else {
      setSelectedRowID(selectedRowID.filter((value) => value !== id));
    }
  };
  const unbanUser = (UserID: string) => {
    dispatch(setLoading(true));
    fetch(process.env.REACT_APP_API_URL+'/user/unban/' + UserID, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tokenUser: localStorage.getItem('tokenUser') }),
    })
      .then((response) => {
        dispatch(setLoading(false));
        if (response.status >= 400) {
          throw new Error('Bad response from server');
        }
        dispatch(setAlert({ type: 'success', title: t('success'), message: t('user_unban_successfully') }));
        setRows((prevRows) => prevRows.filter((row) => row._id !== UserID));
        setOpositeStoredCount((prevCount) => prevCount + 1);
        setTotalUsers((prevCount) => prevCount - 1);
      })
      .catch(() => {
        dispatch(setLoading(false));
        dispatch(setAlert({ type: 'error', title: t('error'), message: t('user_unban_failed') }));
      });
  };
  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectAllChecked = event.target.checked;

    if (!selectAllChecked) {
      setSelectedRowID([]);
    } else {
      const newRowIDSelected = [...rows.map((row) => row._id)];
      setSelectedRowID(newRowIDSelected);
    }
  };
  const banUser = (UserID: string) => {
    dispatch(setLoading(true));
    const path = currentPage == 'banned/' ? 'delete/' : 'ban/';
    fetch(process.env.REACT_APP_API_URL+'/user/' + path + UserID, {
      method: currentPage == 'banned/' ? 'DELETE/' : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tokenUser: localStorage.getItem('tokenUser') }),
    })
      .then((response) => {
        dispatch(setLoading(false));
        if (response.status >= 400) {
          throw new Error('Bad response from server');
        }
        dispatch(setAlert({ type: 'success', title: t('success'), message: t('user_ban_successfully') }));
        setRows((prevRows) => prevRows.filter((row) => row._id !== UserID));
        if (store !== 'banned') {
          setOpositeStoredCount((prevCount) => prevCount + 1);
        }
        setTotalUsers((prevCount) => prevCount - 1);
      })
      .catch(() => {
        dispatch(setLoading(false));
        dispatch(setAlert({ type: 'error', title: t('error'), message: t('user_ban_failed') }));
      });
  };
  const handleMultipleAction = () => {
    if (selectedRowID.length === 0) {
      dispatch(setAlert({ type: 'error', title: t('error'), message: t('no_user_selected') }));
      return;
    }
    switch (actionSelected) {
      case 'delete':
        dispatch(setLoading(true));
        fetch(process.env.REACT_APP_API_URL+'/user/handleMultiAction', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tokenUser: localStorage.getItem('tokenUser'),
            method: 'delete',
            ids: selectedRowID,
          }),
        })
          .then((response) => {
            dispatch(setLoading(false));
            if (response.status >= 400) {
              throw new Error('Bad response from server');
            }
            dispatch(setAlert({ type: 'success', title: t('success'), message: t('user_ban_successfully') }));
            setRows((prevRows) => prevRows.filter((row) => !selectedRowID.includes(row._id)));
            if (store !== 'banned') {
              setOpositeStoredCount((prevCount) => prevCount + selectedRowID.length);
            }
            setTotalUsers((prevCount) => prevCount - selectedRowID.length);
            setSelectedRowID([]);
          })
          .catch(() => {
            dispatch(setLoading(false));
            dispatch(setAlert({ type: 'error', title: t('error'), message: t('user_ban_failed') }));
          });
        break;
      case 'unban':
        dispatch(setLoading(true));
        fetch(process.env.REACT_APP_API_URL+'/user/handleMultiAction', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tokenUser: localStorage.getItem('tokenUser'),
            method: 'unban',
            ids: selectedRowID,
          }),
        })
          .then((response) => {
            dispatch(setLoading(false));
            if (response.status >= 400) {
              throw new Error('Bad response from server');
            }
            dispatch(setAlert({ type: 'success', title: t('success'), message: t('user_unban_successfully') }));
            setRows((prevRows) => prevRows.filter((row) => !selectedRowID.includes(row._id)));
            setOpositeStoredCount((prevCount) => prevCount - selectedRowID.length);
            setTotalUsers((prevCount) => prevCount + selectedRowID.length);
            setSelectedRowID([]);
          })
          .catch(() => {
            dispatch(setLoading(false));
            dispatch(setAlert({ type: 'error', title: t('error'), message: t('user_unban_failed') }));
          });
        break;
      case 'forceDelete':
        dispatch(setLoading(true));
        fetch(process.env.REACT_APP_API_URL+'/user/handleMultiAction', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tokenUser: localStorage.getItem('tokenUser'),
            method: 'forceDelete',
            ids: selectedRowID,
          }),
        })
          .then((response) => {
            dispatch(setLoading(false));
            if (response.status >= 400) {
              throw new Error('Bad response from server');
            }
            dispatch(setAlert({ type: 'success', title: t('success'), message: t('user_force_delete_successfully') }));
            setRows((prevRows) => prevRows.filter((row) => !selectedRowID.includes(row._id)));
            if (store !== 'banned') {
              setOpositeStoredCount((prevCount) => prevCount + selectedRowID.length);
            }
            setTotalUsers((prevCount) => prevCount - selectedRowID.length);
            setSelectedRowID([]);
          })
          .catch(() => {
            dispatch(setLoading(false));
            dispatch(setAlert({ type: 'error', title: t('error'), message: t('user_force_delete_failed') }));
          });
        break;
      case 'editRole':
        dispatch(setLoading(true));
        fetch(process.env.REACT_APP_API_URL+'/user/handleMultiAction', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tokenUser: localStorage.getItem('tokenUser'),
            method: 'editRole',
            ids: selectedRowID,
            role: roleSelected,
          }),
        })
          .then((response) => {
            dispatch(setLoading(false));
            if (response.status >= 400) {
              throw new Error('Bad response from server');
            }
            dispatch(setAlert({ type: 'success', title: t('success'), message: t('user_edit_role_successfully') }));
            setRows((prevRows) => prevRows.filter((row) => !selectedRowID.includes(row._id)));
            setSelectedRowID([]);
          })
          .catch(() => {
            dispatch(setLoading(false));
            dispatch(setAlert({ type: 'error', title: t('error'), message: t('user_edit_role_failed') }));
          });
        break;
      default:
        break;
    }
    setTriggerReloadData(!triggerReloadData);
  };
  const handleEditRole = (_id: string) => {
    dispatch(setLoading(true));
    fetch(process.env.REACT_APP_API_URL+'/user/edit-role/' + _id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tokenUser: localStorage.getItem('tokenUser'),
        role: roleSelected,
      }),
    })
      .then((response) => {
        dispatch(setLoading(false));
        setUserIdChangingRole('');
        if (response.status >= 400) {
          throw new Error('Bad response from server');
        }
        dispatch(setAlert({ type: 'success', title: t('success'), message: t('user_edit_role_successfully') }));
        setRows((prevRows) => prevRows.filter((row) => !selectedRowID.includes(row._id)));
        setSelectedRowID([]);
      })
      .catch(() => {
        dispatch(setLoading(false));
        dispatch(setAlert({ type: 'error', title: t('error'), message: t('user_edit_role_failed') }));
      });
  };
  const columns: TTableColumnData[] = [
    {
      field: '_id',
      headerName: '',
      align: 'center',
      renderCell: ({ value }) => (
        <Checkbox name="_id" checked={selectedRowID.includes(value as string)} value={value} onChange={handleCheckbox} />
      ),
    },
    { field: 'fullName', headerName: t('fullname'), sortable: true, align: 'center' },
    {
      field: 'account',
      headerName: t('account'),
      sortable: true,
      renderCell: ({ value, _id }) => {
        const userUrl = '/user/profile/' + _id;
        return <TLink href={userUrl}>{value}</TLink>;
      },
      align: 'center',
    },
    {
      field: 'role',
      headerName: t('user_role'),
      sortable: true,
      renderCell: ({ value }) => <TTypography variant="body2">{userRoles[value as number]}</TTypography>,
      align: 'center',
    },
    {
      field: 'multiAction',
      headerName: t('action'),
      align: 'center',
      renderCell: ({ _id }) => {
        return (
          <TBox display="flex" alignItems="center" textalign="center">
            {store === 'banned' ? (
              <TButton variant="contained" color="warning" onClick={() => unbanUser(_id as string)}>
                {t('unban')}
              </TButton>
            ) : (
              <TButton
                variant="contained"
                color="warning"
                onClick={() => {
                  if (userIdChangingRole) {
                    handleEditRole(_id as string);
                  } else {
                    setUserIdChangingRole(_id as string);
                    setOpenSelectRoleModal(true);
                  }
                }}
              >
                {userIdChangingRole == _id ? t('update') : t('edit')}
              </TButton>
            )}
            <TButton variant="contained" color="error" marginLeft={1} onClick={() => banUser(_id as string)}>
              {currentPage == 'banned/' ? t('delete') : t('ban')}
            </TButton>
          </TBox>
        );
      },
    },
  ];
  const actionsForSelectedRows =
    store === 'banned'
      ? [
          { label: t('unban'), value: 'unban' },
          { label: t('force_delete'), value: 'forceDelete' },
        ]
      : [
          { label: t('ban'), value: 'delete' },
          { label: t('edit_role'), value: 'editRole', onClick: () => setOpenSelectRoleModal(true) },
        ];

  useEffect(() => {
    if (!userData || userData.role > 2) {
      history.push('/no_permissions');
    }
    const urlGeTUsersManager =
      process.env.REACT_APP_API_URL+'/user/' + currentPage + '?page=' + page + '&perPage=' + rowsPerPage;
    const tokenUser = localStorage.getItem('tokenUser');
    let isSubscribed = true;

    dispatch(setLoading(true));
    fetch(urlGeTUsersManager, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tokenUser }),
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error('Something went wrong.');
        }
        return response.json();
      })
      .then((data) => {
        if (isSubscribed) {
          setRows(data.users);
          setTotalUsers(data.countCurrentStored);
          setOpositeStoredCount(data.countOpositeStored);
        }
        dispatch(setLoading(false));
      })
      .catch(() => {
        dispatch(setAlert({ type: 'error', message: t('error'), title: t('error_fetch_data') }));
        dispatch(setLoading(false));
        history.push('/no_permissions');
      });

    return () => {
      isSubscribed = false;
    };
  }, [page, triggerReloadData, rowsPerPage]);
  useEffect(() => {
    dispatch(setHelmet({ title: t('manager_users') }));
  }, []);
  return rows ? (
    <TBox>
      <TBox display="flex" my={2} px={6} alignItems="center" justifyContent="space-between">
        <TBox display="flex" alignItems="center" color="secondary">
          <TFormControlLabel control={<Checkbox onChange={handleSelectAll} />} label={t('select_all') as string} />
          <TSelect
            marginLeft={3}
            variant="outlined"
            value={actionSelected}
            onChange={(e) => {
              setActionSelected(e.target.value as string);
            }}
          >
            {actionsForSelectedRows.map((action, index) => (
              <MenuItem key={index} value={action.value} onClick={() => action?.onClick?.()}>
                {action.label}
              </MenuItem>
            ))}
          </TSelect>
          <TButton marginLeft={3} variant="contained" height={7} onClick={handleMultipleAction}>
            <TTypography>{t('apply')}</TTypography>
          </TButton>
        </TBox>
        <TLink href={'/dashboard' + (store === 'banned' ? '/user-manager' : '/banned')}>
          <TTypography>
            {store === 'banned'
              ? t('total_amount', { amount: opositeStoredCount })
              : t('banned_amount', { amount: opositeStoredCount })}
          </TTypography>
        </TLink>
      </TBox>
      <TTable
        rows={rows}
        columns={columns}
        paginationProps={{
          count: totalUsers,
          rowsPerPageOptions: [5, 10, 25],
          page: page - 1,
          rowsPerPage: rowsPerPage,
          onPageChange: (event: unknown, newPage: number) => {
            setPage(newPage + 1);
          },
          onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => {
            setRowsPerPage(+event.target.value);
            setPage(1);
          },
        }}
      />
      <TSelectRoleModal
        isOpen={openSelectRoleModal}
        onSelect={(role) => setRoleSelected(role)}
        currenRole={roleSelected}
        onClose={() => {
          setOpenSelectRoleModal(false);
        }}
      />
    </TBox>
  ) : null;
};

export default memo(TUsersManager);
