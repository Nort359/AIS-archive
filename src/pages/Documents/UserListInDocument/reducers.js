/**
 * Created by Nort359@gmail.com on 11.06.2017.
 */
import { GET_ALL_USERS_IN_DOCUMENT } from './actions';

function userListInDocumentReducer(state = [], action) {
    switch (action.type) {
        case GET_ALL_USERS_IN_DOCUMENT:
            return Object.assign({}, action.users);

        default:
            return state;
    }
}

export const userListInDocument = userListInDocumentReducer;
