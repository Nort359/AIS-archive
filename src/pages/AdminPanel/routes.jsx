import React from 'react';
import { Route } from 'react-router';

import AdminPanel from './AdminPanel';
import AddDepartment from './Department/AddDepartment';
import AddPosition from './Position/AddPosition';
import AddType from './TypeDocument/AddType';
import UpdatePosition from './Position/UpdatePosition';


export default (
    <Route>
        <Route component={ AdminPanel } path={ AdminPanel.path } />
        <Route component={ AddDepartment } path={ AddDepartment.path } />
        <Route component={ AddPosition } path={ AddPosition.path } />
        <Route component={ AddType } path={ AddType.path } />
        <Route component={ UpdatePosition } path={ UpdatePosition.path } />
    </Route>
);
