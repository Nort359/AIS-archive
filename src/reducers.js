import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { userData } from './pages/Registration/reducers';
import { department } from './pages/AdminPanel/AddDepartment/reducers';
import { position } from './pages/AdminPanel/AddPosition/reducers';
import { typeDocument } from './pages/AdminPanel/AddType/reducers';


export default combineReducers({
    routing: routerReducer,
    userData,
    department, position, typeDocument
});

