/**
 * Created by AkS-LH@yandex.ru on 06.06.2017.
 */
import { GET_NOTIFICATIONS, GET_NOTIFICATION_FOR_DOCUMENT } from './actions';

function notificationReducer(state = [], action) {

    switch (action.type) {
        case GET_NOTIFICATIONS:
            return Object.assign({}, action.notifications);

        case GET_NOTIFICATION_FOR_DOCUMENT:
            return Object.assign({}, action.notifications);

        default:
            return state;
    }
}

export const notification = notificationReducer;
