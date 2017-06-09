/**
 * Created by Nort359@gmail.com on 10.05.2017.
 */
import axios from 'axios';
import querystring from 'querystring';
import Animation from '../../classes/Animation';

export const REGISTRATION_USER = 'REGISTRATION_USER';
export const AUTHORIZATION_USER = 'AUTHORIZATION_USER';

export const registrationUserDB = newUser => dispatch => {
    axios.post('/api/registration-user.php', querystring.stringify(newUser))
        .then(response => response.data)
        .then(userData => {
            if ( typeof userData === 'object' ) {

                dispatch({
                    type: REGISTRATION_USER,
                    userData
                });
            } else {
                Animation.showMessageBox(userData);
            }

            return userData;
        })
        .then(userData => {
            if ( typeof userData === 'object' ) {
                dispatch({
                    type: AUTHORIZATION_USER,
                    authorization: true
                });
            }
        })
        .catch(error => console.error(error));
};
