/**
 * Created by Nort359@gmail.com on 11.06.2017.
 */
import axios from 'axios';
import querystring from 'querystring';

export const GET_ALL_USERS_IN_DOCUMENT = 'GET_ALL_USERS_IN_DOCUMENT';

export const getAllUsersInDocument = data => dispatch => {
    axios.post('/api/document/userList/userListInDocument-get-all.php', querystring.stringify(data))
        .then(response => response.data)
        .then(users => {
            console.log('users = ', users);
            if (typeof users === 'object') {
                dispatch({
                    type: GET_ALL_USERS_IN_DOCUMENT,
                    users
                });
            }
        })
        .catch(error => console.error(error));
};
