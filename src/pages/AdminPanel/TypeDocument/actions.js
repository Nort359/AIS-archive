/**
 * Created by Nort359@gmail.com on 24.05.2017.
 */
import axios from 'axios';
import querystring from 'querystring';

export const GET_TYPE_DOCUMENT = 'GET_TYPE_DOCUMENT';
export const GET_CURRENT_TYPE_DOCUMENT = 'GET_CURRENT_TYPE_DOCUMENT';
export const DELETE_TYPE_DOCUMENT = 'DELETE_TYPE_DOCUMENT';

export const getTypeDocument = () => dispatch => {
    axios.get('/api/admin/document-type/document-type-get.php')
        .then(response => response.data)
        .then(typeDocument => {
            dispatch({
                type: GET_TYPE_DOCUMENT,
                typeDocument
            });
        })
        .catch(error => console.error(error));
};

export const getCurrentTypeDocument = typeDocument => dispatch => {
    axios.post('/api/admin/document-type/document-type-get-current.php', querystring.stringify(typeDocument))
        .then(response => response.data)
        .then(currentTypeDocument => {
            dispatch({
                type: GET_CURRENT_TYPE_DOCUMENT,
                currentTypeDocument
            });
        })
        .catch(error => console.error(error));
};

export const deleteTypeDocument = typeDocument => dispatch => {
    axios.post('/api/admin/document-type/document-type-delete.php', querystring.stringify(typeDocument))
        .then(response => response.data)
        .then(answer => {
            if (answer === 'Ok') {
                dispatch({
                    type: DELETE_TYPE_DOCUMENT,
                    typeDocumentId : typeDocument.typeDocumentId
                });
            } else if ( answer === 'Вы не можете удалить этот тип документа, так как к нему пользователи уже добавили свои документы' ) {
                alert(answer);
            } else {
                console.log(answer);
            }
        })
        .catch(error => console.error(error));
};
