import React from 'react';
import { Route } from 'react-router';
import Authorization from './Authorization';
import FogottenPassword from './FogottenPassword';

export default (
    <Route>
        <Route component={ Authorization } path={ Authorization.path } />
        <Route component={ FogottenPassword } path={ FogottenPassword.path } />
    </Route>
);
