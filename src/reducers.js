import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { userData } from './pages/Registration/reducers';
import { department } from './pages/AdminPanel/Department/reducers';
import { position } from './pages/AdminPanel/Position/reducers';
import { typeDocument } from './pages/AdminPanel/TypeDocument/reducers';
import { expansion } from './pages/AdminPanel/Expansion/reducers';
import { document, visibleDocs, userAndDocuments } from './pages/Documents/reducers';
import { userList } from './pages/Documents/UserList/reducers';
import { userListInDocument } from './pages/Documents/UserListInDocument/reducers';
import { notification } from './pages/MyOffice/reducers';


export default combineReducers({
    routing: routerReducer,
    userData,
    department, position, typeDocument, expansion,
    document, userAndDocuments, visibleDocs,
    userList, userListInDocument,
    notification
});

