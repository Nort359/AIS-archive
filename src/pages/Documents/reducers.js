/**
 * Created by Nort359@gmail.com on 01.06.2017.
 */
import { GET_DOCUMENTS, GET_CURRENT_DOCUMENT, GET_DOCUMENTS_BY_SEARCH } from './actions';

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

export const document = documentReducer;
