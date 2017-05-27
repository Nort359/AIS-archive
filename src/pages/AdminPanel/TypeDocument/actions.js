/**
 * Created by Nort359@gmail.com on 24.05.2017.
 */
import axios from 'axios';
import querystring from 'querystring';

export const GET_TYPE_DOCUMENT = 'GET_TYPE_DOCUMENT';
export const DELETE_TYPE_DOCUMENT = 'DELETE_TYPE_DOCUMENT';

export const getTypeDocument = () => dispatch => {
    axios.get('http://ais-archive/api/admin/document-type/document-type-get.php')
        .then(response => response.data)
        .then(typeDocument => {
            dispatch({
                type: GET_TYPE_DOCUMENT,
                typeDocument
            });
        })
        .catch(error => console.error(error));
};

export const deleteTypeDocument = typeDocument => dispatch => {
    axios.post('http://ais-archive/api/admin/document-type/document-type-delete.php', querystring.stringify(typeDocument))
        .then(response => response.data)
        .then(answer => {
            if (answer === 'Ok') {
                dispatch({
                    type: DELETE_TYPE_DOCUMENT,
                    typeDocumentId : typeDocument.typeDocumentId
                });
            }
        })
        .catch(error => console.error(error));
};
