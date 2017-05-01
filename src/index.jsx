import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';

import App from './components/App';
import Registration from './components/Registration';
import Authorization from './components/Authorization';

ReactDOM.render(
    <Router history={ hashHistory }>
        <Route path={ '/' } component={ App } >
            <Route path={ '/registration' } component={ Registration } />
            <Route path={ '/authorization' } component={ Authorization } />
        </Route>
    </Router>,
    document.getElementById('app')
);
