import React from 'react';
import { Route } from 'react-router';

import MyOffice from './MyOffice';
import ChangePasswordForm from './ChangePasswordForm/ChangePasswordForm';

export default (
    <Route>
        <Route component={ MyOffice } path={ MyOffice.path } />
        <Route component={ ChangePasswordForm } path={ ChangePasswordForm.path } />
    </Route>
);
