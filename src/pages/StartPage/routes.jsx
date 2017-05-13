import React from 'react';
import { Route } from 'react-router';

import StartPage from './StartPage';

export default (
    <Route>
        <Route component={ StartPage } path={ StartPage.path } />
    </Route>
);
