/**
 * Created by Nort359@gmail.com on 01.06.2017.
 */
import axios from 'axios';
import querystring from 'querystring';

export const GET_DOCUMENTS = 'GET_DOCUMENTS';
export const GET_DOCUMENTS_BY_SEARCH = 'GET_DOCUMENTS_BY_SEARCH';

export const getDocuments = user => dispatch => {
    axios.post('http://ais-archive/api/document/document-get.php', querystring.stringify(user))
        .then(response => response.data)
        .then(documents => {
            if (typeof documents === 'object') {
                dispatch({
                    type: GET_DOCUMENTS,
                    documents
                });
            }
        })
        .catch(error => console.error(error));
};

export const getDocumentsBySearch = search => dispatch => {
    axios.post('http://ais-archive/api/document/document-search.php', querystring.stringify(search))
        .then(response => response.data)
        .then(documents => {
            dispatch({
                type: GET_DOCUMENTS_BY_SEARCH,
                documents
            });
        })
        .catch(error => console.error(error));
};
