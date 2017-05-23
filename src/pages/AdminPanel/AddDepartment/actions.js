/**
 * Created by Nort359@gmail.com on 22.05.2017.
 */
import axios from 'axios';
import querystring from 'querystring';

export const GET_DEPARTMENT = 'GET_DEPARTMENT';
export const DELETE_DEPARTMENT = 'GET_DEPARTMENT';

export const getDepartment = () => dispatch => {
    axios.get('http://ais-archive/api/admin/department/department-get.php')
        .then(response => response.data)
        .then(department => {
            dispatch({
                type: GET_DEPARTMENT,
                department
            });
        })
        .catch(error => console.error(error));
};

export const deleteDepartment = department => dispatch => {
    axios.post('http://ais-archive/api/admin/department/department-delete.php', querystring.stringify(department))
        .then(response => response.data)
        .then(department => {
            dispatch({
                type: GET_DEPARTMENT,
                department
            });
        })
        .catch(error => console.error(error));
};
