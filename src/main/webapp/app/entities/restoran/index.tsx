import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Restoran from './restoran';
import RestoranDetail from './restoran-detail';
import RestoranUpdate from './restoran-update';
import RestoranDeleteDialog from './restoran-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={RestoranUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={RestoranUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={RestoranDetail} />
      <ErrorBoundaryRoute path={match.url} component={Restoran} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={RestoranDeleteDialog} />
  </>
);

export default Routes;
