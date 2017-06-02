/**
 * Created by Nort359@gmail.com on 01.06.2017.
 */
import { GET_DOCUMENTS, GET_DOCUMENTS_BY_SEARCH } from './actions';

function documentReducer(state = [], action) {
    switch (action.type) {
        case GET_DOCUMENTS:
            return Object.assign({}, action.documents);

        case GET_DOCUMENTS_BY_SEARCH:
            return Object.assign({}, action.documents);

        default:
            return state;
    }
}

export const document = documentReducer;
