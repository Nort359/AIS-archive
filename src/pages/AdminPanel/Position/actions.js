/**
 * Created by Nort359@gmail.com on 23.05.2017.
 */
import axios from 'axios';
import querystring from 'querystring';

export const GET_POSITION = 'GET_POSITION';
export const GET_CURRENT_POSITION = 'GET_CURRENT_POSITION';
export const DELETE_CURRENT_POSITION = 'DELETE_CURRENT_POSITION';
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

export const getCurrentPosition = position => dispatch => {
    axios.post('http://ais-archive/api/admin/position/position-get-current.php', querystring.stringify(position))
        .then(response => response.data)
        .then(currentPosition => {
            dispatch({
                type: GET_CURRENT_POSITION,
                currentPosition
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

export const deleteCurrentPosition = position => dispatch => {
    dispatch({
        type: DELETE_CURRENT_POSITION
    });
};
