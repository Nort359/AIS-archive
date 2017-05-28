/**
 * Created by Nort359@gmail.com on 24.05.2017.
 */
import { GET_POSITION, GET_CURRENT_POSITION, DELETE_POSITION } from './actions';

function positionReducer(state = [], action) {
    let positions = [];

    switch (action.type) {
        case GET_POSITION:
            return Object.assign({}, state, action.position);

        case GET_CURRENT_POSITION:
            const currentPosition = {
                currentPosition: action.currentPosition
            };
            return Object.assign({}, state, currentPosition);

        case DELETE_POSITION:
            positions = [];

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
