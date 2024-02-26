import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import TNotFound from 'pages/error/notFound';
import TNoPermission from 'pages/error/notPermission';
import TResetPassword, { TMatchParamsTResetPassword } from 'pages/user/resetPassword';
import TViewUser, { TMatchParamsTViewUser } from 'pages/user';
import TImagesView from 'components/imagesView';
import TChatRooms from 'pages/chat';
import TRoom from 'pages/chat/room';
import TUsersManager from 'pages/user/manager';

export type TMatchDefaultParam = {
  id?: string;
};

export type TRouteProps = {
  path: string;
  exact?: boolean;
  main: (props: RouteComponentProps<Record<string, string>>) => JSX.Element;
  breadcrumbs?: Array<{ href: string; label: string }>;
  title?: string;
};

export const TRoutesLogged: Array<TRouteProps> = [
  {
    path: '/',
    main: () => <TChatRooms />,
    title: 'home',
    breadcrumbs: [{ href: '/', label: 'home' }],
    exact: true,
  },
  {
    path: '/images',
    main: () => <TImagesView />,
    title: 'images',
    breadcrumbs: [{ href: '/', label: 'home' }],
    exact: true,
  },
  {
    path: '/room-chat/:id',
    main: (props) => <TRoom roomId={props.match.params.id} />,
    exact: true,
  },
  {
    path: '/user/profile/:_id',
    main: (props: RouteComponentProps<TMatchParamsTViewUser>) => <TViewUser {...props} />,
    title: 'profile',
    breadcrumbs: [{ href: '/', label: 'home' }],
    exact: true,
  },
  {
    path: '/dashboard/user-manager',
    main: () => <TUsersManager />,
    title: 'profile',
    breadcrumbs: [{ href: '/', label: 'home' }],
    exact: true,
  },
  {
    path: '/dashboard/banned',
    main: () => <TUsersManager store="banned" />,
    title: 'profile',
    breadcrumbs: [{ href: '/', label: 'home' }],
    exact: true,
  },
  {
    path: '/no_permissions',
    title: '',
    main: () => <TNoPermission />,
    breadcrumbs: [{ href: '/', label: 'home' }],
  },
  {
    path: '/not_found',
    title: '',
    main: () => <TNotFound />,
    breadcrumbs: [{ href: '/', label: 'home' }],
  },
  {
    path: '*',
    title: '',
    main: () => <TNotFound />,
    breadcrumbs: [{ href: '/', label: 'home' }],
  },
];

export const TRoutesNotLogged: Array<TRouteProps> = [
  {
    path: '/',
    main: () => <TChatRooms />,
    title: 'home',
    breadcrumbs: [{ href: '/', label: 'home' }],
    exact: true,
  },
  {
    path: '/images',
    main: () => <TImagesView />,
    title: 'images',
    breadcrumbs: [{ href: '/', label: 'home' }],
    exact: true,
  },
  {
    path: '/user/profile/:_id',
    main: (props: RouteComponentProps<TMatchParamsTViewUser>) => <TViewUser {...props} />,
    title: 'infomation',
    breadcrumbs: [{ href: '/', label: 'home' }],
    exact: true,
  },
  {
    path: '/user/reset-password/:tokenRestore',
    main: (props: RouteComponentProps<TMatchParamsTResetPassword>) => <TResetPassword {...props} />,
    title: 'reset_password',
    breadcrumbs: [
      { href: '/', label: 'home' },
      { href: '/user', label: 'user' },
    ],
    exact: true,
  },
  {
    path: '/no_permissions',
    title: '',
    main: () => <TNoPermission />,
    breadcrumbs: [{ href: '/', label: 'home' }],
  },
  {
    path: '/not_found',
    title: '',
    main: () => <TNotFound />,
    breadcrumbs: [{ href: '/', label: 'home' }],
  },
  {
    path: '*',
    title: '',
    main: () => <TNotFound />,
    breadcrumbs: [{ href: '/', label: 'home' }],
  },
];
