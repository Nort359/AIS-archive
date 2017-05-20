/**
 * Created by Nort359@gmail.com on 10.05.2017.
 */
import axios from 'axios';
import querystring from 'querystring';

export const REGISTRATION_USER = 'REGISTRATION_USER';
export const AUTHORIZATION_USER = 'AUTHORIZATION_USER';

export const registrationUserDB = newUser => dispatch => {
    axios.post('http://ais-archive/api/registration-user.php', querystring.stringify(newUser))
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
