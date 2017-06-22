import React from 'react';
import { Route } from 'react-router';

import AdminPanel from './AdminPanel';

import AddDepartment from './Department/AddDepartment';
import AddPosition from './Position/AddPosition';
import AddType from './TypeDocument/AddTypeDocument';
import AddExpansion from './Expansion/AddExpansion';

import UpdateDepartment from './Department/UpdateDepartment';
import UpdatePosition from './Position/UpdatePosition';
import UpdateTypeDocument from './TypeDocument/UpdateTypeDocument';
import UpdateExpansion from './Expansion/UpdateExpansion';

export default (
    <Route>
        <Route component={ AdminPanel } path={ AdminPanel.path } />
        <Route component={ AddDepartment } path={ AddDepartment.path } />
        <Route component={ AddPosition } path={ AddPosition.path } />
        <Route component={ AddType } path={ AddType.path } />
        <Route component={ AddExpansion } path={ AddExpansion.path } />
        <Route component={ UpdateDepartment } path={ UpdateDepartment.path } />
        <Route component={ UpdatePosition } path={ UpdatePosition.path } />
        <Route component={ UpdateTypeDocument } path={UpdateTypeDocument.path } />
        <Route component={ UpdateExpansion } path={UpdateExpansion.path } />
    </Route>
);
