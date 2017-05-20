import React from 'react';
import { Route } from 'react-router';
import MyOffice from './MyOffice';

export default (
    <Route>
        <Route component={ MyOffice } path={ MyOffice.path } />
    </Route>
);
