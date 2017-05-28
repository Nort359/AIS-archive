/**
 * Created by Nort359@gmail.com on 24.05.2017.
 */
import { GET_TYPE_DOCUMENT, GET_CURRENT_TYPE_DOCUMENT, DELETE_TYPE_DOCUMENT } from './actions';

function typeDocumentReducer(state = [], action) {
    switch (action.type) {
        case GET_TYPE_DOCUMENT:
            return Object.assign({}, state, action.typeDocument);

        case GET_CURRENT_TYPE_DOCUMENT:
            const currentTypeDocument = {
                currentTypeDocument: action.currentTypeDocument
            };
            return Object.assign({}, state, currentTypeDocument);

        case DELETE_TYPE_DOCUMENT:
            let typeDocuments = [];

            for (let typeDocument in state) {
                if (state.hasOwnProperty(typeDocument)) {
                    if (state[typeDocument].id !== action.typeDocumentId) {
                        typeDocuments.push(state[typeDocument]);
                    }
                }
            }

            return typeDocuments;

        default:
            return state;
    }
}

export const typeDocument = typeDocumentReducer;
