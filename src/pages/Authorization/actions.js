/**
 * Created by Nort359@gmaik.com on 13.05.2017.
 */
import axios from 'axios';
import querystring from 'querystring';

import { AUTHORIZATION_USER } from '../Registration/actions';

export const GET_USER = 'GET_USER';

export const authorizationUser = user => dispatch => {
    axios.post('http://ais-archive/api/get-user.php', querystring.stringify(user))
        .then(response => response.data)
        .then(userData => {
            dispatch({
                type: GET_USER,
                userData
            });
            return userData;
        })
        .then(userData => {
            if (typeof userData === 'object') {
                dispatch({
                    type: AUTHORIZATION_USER,
                    authorization: true
                });
            }
        })
        .catch(error => console.error(error));
};
