/**
 * Created by Nort359@gmail.com on 10.05.2017.
 */
import { REGISTRATION_USER, AUTHORIZATION_USER } from './actions';

function userReducer(state = [], action) {
    switch (action.type) {
        case REGISTRATION_USER:
            return Object.assign({}, state, action.userData);

        case AUTHORIZATION_USER:
            const authorizationObject = {
                authorization: action.authorization
            };

            return Object.assign({}, state, authorizationObject);

        default:
            return state;
    }
}

export const userData = userReducer;
