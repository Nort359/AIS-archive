import React from 'react';
import { Route } from 'react-router';
import Registration from './Registration';

export default (
    <Route>
        <Route component={ Registration } path={ Registration.path } />
    </Route>
);
