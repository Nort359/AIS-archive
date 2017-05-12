/**
 * Created by Nort359@gmail.com on 10.05.2017.
 */
import axios from 'axios';
import querystring from 'querystring';

export const REGISTRATION_USER = 'REGISTRATION_USER';
export const AUTHORIZATION_USER = 'AUTHORIZATION_USER';

export const registrationUser = newUser => dispatch => {
    axios.post('http://ais-archive/api/registration-user.php', querystring.stringify(newUser))
        .then(response => response.data)
        .then(userData => {
            dispatch({
                type: REGISTRATION_USER,
                userData
            });
        })
        .then(() => {
            dispatch({
                type: AUTHORIZATION_USER,
                authorization: true
            });
        })
        .catch(error => console.error(error));
};

/*
export function addUser(userData) {
    console.log('userData: ', userData);

    alert(userData.userLastName);

    return {
        type: ADD_USER,
        userData
    };

    /*

    return axios.post('http://ais-archive/api/registration-user.php',
        querystring.stringify({
            userFirstName: userData.userFirstName,
            userMiddleName: userData.userMiddleName,
            userLastName: userData.userLastName,
            userEmail: userData.userEmail,
            userPassword: userData.userPassword
        }))
        .then(response => {
            console.log('userData in axious: ', userData);
            console.log('response.data in axious: ', response.data);
            return response.data
        })
        .then(userData => {
            console.log('userData2 in axious: ', userData);
            return {
                type: ADD_USER,
                userData
            };
        })
        .catch(error => console.error(error));

    /*
    return {
        type: ADD_USER,
        userFirstName: userData.userFirstName,
        userMiddleName: userData.userMiddleName,
        userLastName: userData.userLastName,
        userEmail: userData.userEmail,
        userPassword: userData.userPassword
    };


}
*/
