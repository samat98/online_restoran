import React from 'react';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import UserManagement from './user-management';
import LogsPage from "app/modules/administration/logs/logs";
import HealthPage from "app/modules/administration/health/health";
import AuditsPage from "app/modules/administration/audits/audits";
import MetricsPage from "app/modules/administration/metrics/metrics";
import ConfigurationPage from "app/modules/administration/configuration/configuration";
import Docs from './docs/docs'

const Routes = ({ match }) => (
  <div>
    <ErrorBoundaryRoute path={`${match.url}/user-management`} component={UserManagement} />
    <ErrorBoundaryRoute exact path={`${match.url}/logs`} component={LogsPage} />
    <ErrorBoundaryRoute exact path={`${match.url}/audits`} component={AuditsPage} />
    <ErrorBoundaryRoute exact path={`${match.url}/configuration`} component={ConfigurationPage} />
    <ErrorBoundaryRoute exact path={`${match.url}/metrics`} component={MetricsPage} />
    <ErrorBoundaryRoute exact path={`${match.url}/health`} component={HealthPage} />
    <ErrorBoundaryRoute exact path={`${match.url}/docs`} component={Docs} />
  </div>
);

export default Routes;
