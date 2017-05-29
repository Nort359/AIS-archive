/**
 * Created by Nort359@gmail.com on 29.05.2017.
 */
import axios from 'axios';
import querystring from 'querystring';

export const REGISTRATION_USER = 'REGISTRATION_USER';
export const AUTHORIZATION_USER = 'AUTHORIZATION_USER';

export const updateUserData = newUserData => dispatch => {
    axios.post('http://ais-archive/api/user/user-data-update.php', querystring.stringify(newUserData))
        .then(response => response.data)
        .then(userData => {
            dispatch({
                type: REGISTRATION_USER,
                userData
            });
        })
        .then(() => {
            dispatch({
                type: AUTHORIZATION_USER,
                authorization: true
            });
        })
        .catch(error => console.error(error));
};
