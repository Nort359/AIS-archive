/**
 * Created by AkS-LH@yandex.ru on 06.06.2017.
 */
import axios from 'axios';
import querystring from 'querystring';

export const GET_NOTIFICATIONS = 'GET_NOTIFICATIONS';
export const GET_NOTIFICATION_FOR_DOCUMENT = 'GET_NOTIFICATION_FOR_DOCUMENT';

export const getNotifications = user => dispatch => {
    axios.post('/api/notification/notification-get-for-user.php', querystring.stringify(user))
        .then(response => response.data)
        .then(notifications => {
            if (typeof notifications === 'object') {
                dispatch({
                    type: GET_NOTIFICATIONS,
                    notifications
                });
            }
        })
        .catch(error => console.error(error));
};

export const getNotificationForDocument = data => dispatch => {
    axios.post('/api/notification/notification-get-for-document.php', querystring.stringify(data))
        .then(response => response.data)
        .then(notifications => {
            if (typeof notifications === 'object') {
                dispatch({
                    type: GET_NOTIFICATION_FOR_DOCUMENT,
                    notifications
                });
            }
        })
        .catch(error => console.error(error));
};
