import React from 'react';
import { Route } from 'react-router';
import Authorization from './Authorization';

export default (
    <Route>
        <Route component={ Authorization } path={ Authorization.path } />
    </Route>
);
