import React from 'react';
import { Route } from 'react-router';
import Documents from './Documents';
import AddDocument from './AddDocument/AddDocument';
import ReplaceDocument from './ReplaceDocument/ReplaceDocument';

export default (
    <Route>
        <Route component={ Documents } path={ Documents.path } />
        <Route component={ AddDocument } path={ AddDocument.path } />
        <Route component={ ReplaceDocument } path={ ReplaceDocument.path } />
    </Route>
);
