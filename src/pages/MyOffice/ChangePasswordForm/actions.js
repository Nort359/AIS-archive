/**
 * Created by Nort359@gmail.com on 29.05.2017.
 */
import axios from 'axios';
import querystring from 'querystring';

export const updatePassword = newPassword => dispatch => {
    console.log('pass', newPassword);
    axios.post('/api/user/user-password-update.php', querystring.stringify(newPassword))
        .then(response => response.data)
        .then(answer => {
            console.log('Server', answer);
            if (answer === 'Ok') {

            }
        })
        .catch(error => console.error(error));
};
