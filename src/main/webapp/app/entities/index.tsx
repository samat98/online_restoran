import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Order from './order';
import OrderDetails from './order-details';
import Food from './food';
import Category from './category';
import Delivery from './delivery';
import Restoran from './restoran';
import Menu from './menu';
import Manager from './manager';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}order`} component={Order} />
      <ErrorBoundaryRoute path={`${match.url}order-details`} component={OrderDetails} />
      <ErrorBoundaryRoute path={`${match.url}food`} component={Food} />
      <ErrorBoundaryRoute path={`${match.url}category`} component={Category} />
      <ErrorBoundaryRoute path={`${match.url}delivery`} component={Delivery} />
      <ErrorBoundaryRoute path={`${match.url}restoran`} component={Restoran} />
      <ErrorBoundaryRoute path={`${match.url}menu`} component={Menu} />
      <ErrorBoundaryRoute path={`${match.url}manager`} component={Manager} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
