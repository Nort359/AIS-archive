/**
 * Created by Nort359@gmail.com on 13.05.2017.
 */
import axios from 'axios';

import { AUTHORIZATION_USER } from './pages/Registration/actions';

export const EXISTS_USER = 'EXISTS_USER';

export const getUserFromSession = () => dispatch => {
    console.log('getUserFromSession');

    window.sessionData = '<?php echo json_encode($_SESSION); ?>';
    console.log('window.sessionData', window.sessionData);

    const sessionUserData = window.sessionData;

    console.log('sessionUserData', sessionUserData);
    /*
    axios.get('http://ais-archive/api/get-user-from-session.php')
        .then(response => response.data)
        .then(userData => {
            dispatch({
                type: EXISTS_USER,
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
        */
};