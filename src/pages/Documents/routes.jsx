import React from 'react';
import { Route } from 'react-router';
import Documents from './Documents';
import AddDocument from './AddDocument/AddDocument';
import ReplaceDocument from './ReplaceDocument/ReplaceDocument';
import UpdateDocument from './UpdateDocument/UpdateDocument';
import UserList from './UserList/UserList';
import UserListInDocument from './UserListInDocument/UserListInDocument';
import test from './test';

export default (
    <Route>
        <Route component={ Documents } path={ Documents.path } />
        <Route component={ AddDocument } path={ AddDocument.path } />
        <Route component={ ReplaceDocument } path={ ReplaceDocument.path } />
        <Route component={ UpdateDocument } path={ UpdateDocument.path } />
        <Route component={ UserList } path={ UserList.path } />
        <Route component={ UserListInDocument } path={ UserListInDocument.path } />
        <Route component={ test } path={ test.path } />
    </Route>
);
