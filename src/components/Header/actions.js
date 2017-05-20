/**
 * Created by Nort359@gmail.com on 14.05.2017.
 */
import axios from 'axios';

export const EXIT_USER = 'EXIT_USER';

export const exitUser = () => dispatch => {
    axios.get('http://ais-archive/api/user-delete.php')
        .then(response => response.data)
        .then(() => {
            dispatch({
                type: EXIT_USER
            });
        })
        .catch(error => console.error(error));
    // TODO Файл куки всё-равно остаётся, исправить по возможности
};
