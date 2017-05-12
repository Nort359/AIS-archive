import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { userData } from './pages/Registration/reducers';


export default combineReducers({
    routing: routerReducer,
    userData
});

