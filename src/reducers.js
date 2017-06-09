import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { userData } from './pages/Registration/reducers';
import { department } from './pages/AdminPanel/Department/reducers';
import { position } from './pages/AdminPanel/Position/reducers';
import { typeDocument } from './pages/AdminPanel/TypeDocument/reducers';
import { document } from './pages/Documents/reducers';
import { userList } from './pages/Documents/UserList/reducers';
import { notification } from './pages/MyOffice/reducers';


export default combineReducers({
    routing: routerReducer,
    userData,
    department, position, typeDocument,
    document, userList,
    notification
});

