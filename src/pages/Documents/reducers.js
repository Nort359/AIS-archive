/**
 * Created by Nort359@gmail.com on 01.06.2017.
 */
import { GET_DOCUMENTS, GET_CURRENT_DOCUMENT, GET_DOCUMENTS_BY_SEARCH, PUT_VISIBLE_DOCS, GET_USERS_AND_DOCUMENTS } from './actions';

function documentReducer(state = [], action) {
    let currentDocument = {};

    switch (action.type) {
        case GET_DOCUMENTS:
            return Object.assign({}, action.documents);

        case GET_CURRENT_DOCUMENT:
            currentDocument = {
                currentDocument: action.currentDocument
            };
            return Object.assign({}, currentDocument);

        case GET_DOCUMENTS_BY_SEARCH:
            return Object.assign({}, action.documents);

        default:
            return state;
    }
}

function visibleDocsReducer(state = true, action) {
    switch (action.type) {
        case PUT_VISIBLE_DOCS:
            return action.value;

        default:
            return state;
    }
}

function userAndDocumentsReducer(state = true, action) {
    switch (action.type) {
        case GET_USERS_AND_DOCUMENTS:
            return Object.assign({}, action.documents);

        default:
            return state;
    }
}

export const document = documentReducer;
export const visibleDocs = visibleDocsReducer;
export const userAndDocuments = userAndDocumentsReducer;
