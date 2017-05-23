/**
 * Created by Nort359@gmail.com on 22.05.2017.
 */
import { GET_DEPARTMENT } from './actions';

function departmentReducer(state = [], action) {
    switch (action.type) {
        case GET_DEPARTMENT:
            return Object.assign({}, state, action.department);

        default:
            return state;
    }
}

export const department = departmentReducer;
