/**
 * Created by Nort359@gmail.com on 10.05.2017.
 */
import axios from 'axios';
import querystring from 'querystring';

import { ADD_USER, AUTHORIZATION_USER } from './actions';

export default function userReducer(state = [], action) {
    switch (action.type) {
        case ADD_USER:
            axios.post('http://ais-archive/api/registration-user.php',
                querystring.stringify(action.userData))
                .then(user => {
                    console.log(user.data);
                    return this.props.user = user.data;
                })
                .catch(error => console.error(error));
            return action.userData;

        case AUTHORIZATION_USER:
            return action.authorization;

        default:
            return state;
    }
}
