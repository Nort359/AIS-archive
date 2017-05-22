import React from 'react';
import { Route } from 'react-router';

import AdminPanel from './AdminPanel';
import AddDepartment from './AddDepartment/AddDepartment';
import AddPosition from './AddPosition/AddPosition';
import AddType from './AddType/AddType';

export default (
    <Route>
        <Route component={ AdminPanel } path={ AdminPanel.path } />
        <Route component={ AddDepartment } path={ AddDepartment.path } />
        <Route component={ AddPosition } path={ AddPosition.path } />
        <Route component={ AddType } path={ AddType.path } />
    </Route>
);
