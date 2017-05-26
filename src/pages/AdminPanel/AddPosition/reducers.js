/**
 * Created by Nort359@gmail.com on 24.05.2017.
 */
import { GET_POSITION, DELETE_POSITION } from './actions';

function positionReducer(state = [], action) {
    switch (action.type) {
        case GET_POSITION:
            return Object.assign({}, state, action.position);

        case DELETE_POSITION:
            let positions = [];

            for (let position in state) {
                if (state.hasOwnProperty(position)) {
                    if (state[position].id !== action.positionId) {
                        positions.push(state[position]);
                    }
                }
            }

            return positions;

        default:
            return state;
    }
}

export const position = positionReducer;
