import React from 'react';
import { Route } from 'react-router';

import MyOffice from './MyOffice';
import ChangePasswordForm from './ChangePasswordForm/ChangePasswordForm';
import ChangeDataUserFrom from './ChangeDataUserFrom/ChangeDataUserFrom';
import Notifications from './Notifications/Notifications';

export default (
    <Route>
        <Route component={ MyOffice } path={ MyOffice.path } />
        <Route component={ ChangePasswordForm } path={ ChangePasswordForm.path } />
        <Route component={ ChangeDataUserFrom } path={ ChangeDataUserFrom.path } />
        <Route component={ Notifications } path={ Notifications.path } />
    </Route>
);
