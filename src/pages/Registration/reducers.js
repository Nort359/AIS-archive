/**
 * Created by Nort359@gmail.com on 10.05.2017.
 */
import { REGISTRATION_USER, AUTHORIZATION_USER } from './actions';
import { GET_USER } from '../Authorization/actions';
import { TOGGLE_USER } from '../StartPage/actions';
import { EXISTS_USER } from '../../actions';

function userReducer(state = [], action) {
    switch (action.type) {
        case GET_USER:
            return Object.assign({}, state, action.userData);

        case REGISTRATION_USER:
            return Object.assign({}, state, action.userData);

        case AUTHORIZATION_USER:
            const authorizationObject = {
                authorization: action.authorization,
                showNotification: true
            };

            return Object.assign({}, state, authorizationObject);

        case TOGGLE_USER:
            const notification = {
                authorization: true,
                showNotification: false
            };

            return Object.assign({}, state, notification);

        case EXISTS_USER:
            console.log('EXISTS_USER');
            return Object.assign({}, state, action.userData);

        default:
            return state;
    }
}

export const userData = userReducer;
