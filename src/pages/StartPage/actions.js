/**
 * Created by Nort3 on 13.05.2017.
 */

export const TOGGLE_USER = 'TOGGLE_USER';

export const toggleNotification = () => dispatch => {
    setTimeout(() => {
        dispatch({
            type: TOGGLE_USER,
            showNotification: false
        });
    }, 1000);
};
