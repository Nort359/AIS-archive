/**
 * Created by Nort359@gmail.com on 18.06.2017.
 */
import React from 'react';
import { Route } from 'react-router';

import Help from './Help';

export default (
    <Route>
        <Route component={ Help } path={ Help.path } />
    </Route>
);
