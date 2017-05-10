import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App';

import Authorization from './pages/Authorization/Authorization';
import AuthorizationRoutes from './pages/Authorization/routes';
import RegistrationRoutes from './pages/Registration/routes';

export default (
    <Route component={ App } path={ App.path } >
        <IndexRoute component={ Authorization } />

        { AuthorizationRoutes }
        { RegistrationRoutes }
    </Route>
);
