/**
 * Created by Nort359@gmail.com on 10.05.2017.
 */
import { REGISTRATION_USER, AUTHORIZATION_USER } from './actions';
import { GET_USER, GET_GENERATE_KEY } from '../Authorization/actions';
import { EXISTS_USER } from '../../actions';
import { EXIT_USER } from '../../components/Header/actions';

function userReducer(state = [], action) {
    switch (action.type) {
        case GET_USER:
            return Object.assign({}, state, action.userData);

        case REGISTRATION_USER:
            return Object.assign({}, state, action.userData);

        case AUTHORIZATION_USER:
            const authorizationObject = {
                authorization: action.authorization
            };

            return Object.assign({}, state, authorizationObject);

        case EXISTS_USER:
            return Object.assign({}, state, action.userData);

        case EXIT_USER:
            return [];

        case GET_GENERATE_KEY:
            return Object.assign({}, state, action.key);

        default:
            return state;
    }
}

export const userData = userReducer;
