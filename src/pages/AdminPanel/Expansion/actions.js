/**
 * Created by Nort359@gmail.com on 14.06.2017.
 */
import axios from 'axios';
import querystring from 'querystring';

export const GET_EXPANSION = 'GET_EXPANSION';
export const GET_CURRENT_EXPANSION = 'GET_CURRENT_EXPANSION';
export const DELETE_EXPANSION = 'DELETE_EXPANSION';

export const getExpansion = () => dispatch => {
    axios.get('/api/admin/expansion/expansion-get.php')
        .then(response => response.data)
        .then(expansion => {
            dispatch({
                type: GET_EXPANSION,
                expansion
            });
        })
        .catch(error => console.error(error));
};

export const getCurrentExpansion = expansion => dispatch => {
    axios.post('/api/admin/expansion/expansion-get-current.php', querystring.stringify(expansion))
        .then(response => response.data)
        .then(currentExpansion => {
            dispatch({
                type: GET_CURRENT_EXPANSION,
                currentExpansion
            });
        })
        .catch(error => console.error(error));
};

export const deleteExpansion = expansion => dispatch => {
    console.log('Hey');
    axios.post('/api/admin/expansion/expansion-delete.php', querystring.stringify(expansion))
        .then(response => response.data)
        .then(answer => {
            if (answer === 'Ok') {
                console.log('answer = ', answer);
                dispatch({
                    type: DELETE_EXPANSION,
                    expansionId : expansion.expansionId
                });
            } else if (answer === 'К этому отделу привязаны пользователи') {
                alert(answer);
            }
        })
        .catch(error => console.error(error));
};
