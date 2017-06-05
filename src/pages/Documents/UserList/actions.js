/**
 * Created by Nort359@gmail.com on 05.06.2017.
 */
import axios from 'axios';
import querystring from 'querystring';

export const GET_ALL_USERS = 'GET_ALL_USERS';

export const getAllUsers = () => dispatch => {
    axios.get('/api/document/userList/userList-get-all.php')
        .then(response => response.data)
        .then(users => {
            if (typeof users === 'object') {
                dispatch({
                    type: GET_ALL_USERS,
                    users
                });
            }
        })
        .catch(error => console.error(error));
};
