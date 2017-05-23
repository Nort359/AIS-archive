/**
 * Created by Nort359@gmail.com on 23.05.2017.
 */
import axios from 'axios';

export const GET_POSITION = 'GET_POSITION';

export const getPosition = () => dispatch => {
    axios.get('http://ais-archive/api/admin/position/position-get.php')
        .then(response => response.data)
        .then(department => {
            dispatch({
                type: GET_POSITION,
                department
            });
        })
        .catch(error => console.error(error));
};
