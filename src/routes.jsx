import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App';

import StartPage from './pages/StartPage/StartPage';

import StartPageRoutes from './pages/StartPage/routes';
import AuthorizationRoutes from './pages/Authorization/routes';
import RegistrationRoutes from './pages/Registration/routes';
import MyOffice from './pages/MyOffice/routes';
import AdminPanel from './pages/AdminPanel/routes';
import Documents from './pages/Documents/routes';
import Help from './pages/Help/routes';

export default (
    <Route component={ App } path={ App.path } >
        <IndexRoute component={ StartPage } />

        { StartPageRoutes }
        { AuthorizationRoutes }
        { RegistrationRoutes }
        { MyOffice }
        { AdminPanel }
        { Documents }
        { Help }
    </Route>
);
