import React, { memo, useEffect } from 'react';
import { BrowserRouter as Router, Route, RouteComponentProps, Switch } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'store';
import { getCurrentUserData } from 'store/thunk/auth';

import TLayout from 'container/layout';

import { TRouteProps, TRoutesLogged, TRoutesNotLogged } from 'router/routes';
import TTypography from 'components/typography';
import THelmet from 'container/layout/helmet';
import TBreadcrumbs from 'components/breadcrumbs';

const TRouter = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const TRoutes = isLoggedIn ? TRoutesLogged : TRoutesNotLogged;
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getCurrentUserData());
  }, []);

  return (
    <Router>
      <TLayout width="100%">
        <Switch>
          {TRoutes.map((props: TRouteProps, index) => (
            <Route
              key={index}
              component={(propsComponent: RouteComponentProps) => (
                <>
                  {<THelmet />}
                  {props.title && <TTypography textAlign="center" variant="h1" margintop={2}>{t(props.title)}</TTypography>}
                  <TBreadcrumbs separator="/" items={props.breadcrumbs || [{ label: t('home'), href: '/' }]} />
                  {props.main(propsComponent)}
                </>
              )}
              {...props}
            />
          ))}
        </Switch>
      </TLayout>
    </Router>
  );
};

export default memo(TRouter);
