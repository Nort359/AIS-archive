import React from 'react';
import { Route } from 'react-router';
import Documents from './Documents';
import AddDocument from './AddDocument/AddDocument';

export default (
    <Route>
        <Route component={ Documents } path={ Documents.path } />
        <Route component={ AddDocument } path={ AddDocument.path } />
    </Route>
);
