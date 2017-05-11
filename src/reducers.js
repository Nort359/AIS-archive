import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import RegistrationReducer from './pages/Registration/reducers';


export default combineReducers({
    routing: routerReducer,
    RegistrationReducer
});

