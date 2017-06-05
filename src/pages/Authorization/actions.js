/**
 * Created by Nort359@gmaik.com on 13.05.2017.
 */
import axios from 'axios';
import querystring from 'querystring';
import $ from 'jquery';

import { AUTHORIZATION_USER } from '../Registration/actions';

export const GET_USER = 'GET_USER';

function showMessageBox(message) {
    // отображаем notification
    let messageBox = $('.message-box');
    let messageBoxText = $('.message-box__text span');

    messageBox.css('display', 'inline-block');

    messageBoxText.text(message);

    setTimeout(() => {
        let messageBox = $('.message-box');
        messageBox.css('display', 'none');
    }, 3000);
}

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
                showMessageBox(userData);
                console.log(userData);
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
