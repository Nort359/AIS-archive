/**
 * Created by Nort359@gmaik.com on 13.05.2017.
 */
import axios from 'axios';
import querystring from 'querystring';

import Animation from '../../classes/Animation';

import { AUTHORIZATION_USER } from '../Registration/actions';

export const GET_USER = 'GET_USER';

export const authorizationUser = user => dispatch => {
    axios.post('/api/get-user.php', querystring.stringify(user))
        .then(response => response.data)
        .then(userData => {
            if (typeof userData === 'object') {
                dispatch({
                    type: GET_USER,
                    userData
                });
            } else {
                Animation.showMessageBox(userData);
                const buttonSpinner  = document.getElementsByClassName('registration__button_spinner')[0];
                buttonSpinner.classList.add('mk-spinner-ring');

                const buttonSpinnerStyle = buttonSpinner.style;
                buttonSpinnerStyle.display = 'none';
            }
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
