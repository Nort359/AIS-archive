/**
 * Created by Nort359@gmail.com on 23.05.2017.
 */
import axios from 'axios';
import querystring from 'querystring';

export const GET_POSITION = 'GET_POSITION';
export const DELETE_POSITION = 'DELETE_POSITION';

export const getPosition = () => dispatch => {
    axios.get('http://ais-archive/api/admin/position/position-get.php')
        .then(response => response.data)
        .then(position => {
            dispatch({
                type: GET_POSITION,
                position
            });
        })
        .catch(error => console.error(error));
};

export const deletePosition = position => dispatch => {
    axios.post('http://ais-archive/api/admin/position/position-delete.php', querystring.stringify(position))
        .then(response => response.data)
        .then(answer => {
            if (answer === 'Ok') {
                dispatch({
                    type: DELETE_POSITION,
                    positionId : position.positionId
                });
            }
        })
        .catch(error => console.error(error));
};
