/**
 * Created by Nort359@gmail.com on 10.05.2017.
 */

export const ADD_USER = 'ADD_USER';
export const AUTHORIZATION_USER = 'AUTHORIZATION_USER';

export function addUser(userData) {
    return {
        type: ADD_USER,
        userData: userData

    };
}

export function toggleAuthorization(authorization) {
    return {
        type: AUTHORIZATION_USER,
        authorization
    }
}
