import React from 'react';
import { Route } from 'react-router';
import Documents from './Documents';

export default (
    <Route>
        <Route component={ Documents } path={ Documents.path } />
    </Route>
);
