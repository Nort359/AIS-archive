/**
 * Created by Nort359@gmail.com on 14.06.2017.
 */
import { GET_EXPANSION, GET_CURRENT_EXPANSION, DELETE_EXPANSION } from './actions';

function expansionReducer(state = [], action) {
    switch (action.type) {
        case GET_EXPANSION:
            return Object.assign({}, action.expansion);

        case GET_CURRENT_EXPANSION:
            const currentExpansion = {
                currentExpansion: action.currentExpansion
            };
            return Object.assign({}, state, currentExpansion);

        case DELETE_EXPANSION:
            let expansions = [];

            for (let expansion in state) {
                if (state.hasOwnProperty(expansion)) {
                    if (state[expansion].id !== action.expansionId) {
                        expansions.push(state[expansion]);
                    }
                }
            }

            return expansions;

        default:
            return state;
    }
}

export const expansion = expansionReducer;
