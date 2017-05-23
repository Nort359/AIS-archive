import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { userData } from './pages/Registration/reducers';
import { department } from './pages/AdminPanel/AddDepartment/reducers';


export default combineReducers({
    routing: routerReducer,
    userData,
    department
});

