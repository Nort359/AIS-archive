/**
 * Created by Nort359@gmail.com on 05.06.2017.
 */
import { GET_ALL_USERS } from './actions';

function userListReducer(state = [], action) {
    let currentDocument = {};

    switch (action.type) {
        case GET_ALL_USERS:
            return Object.assign({}, action.users);

        default:
            return state;
    }
}

export const userList = userListReducer;
