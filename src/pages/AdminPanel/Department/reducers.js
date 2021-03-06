/**
 * Created by Nort359@gmail.com on 22.05.2017.
 */
import { GET_DEPARTMENT, GET_CURRENT_DEPARTMENT, DELETE_DEPARTMENT } from './actions';

function departmentReducer(state = [], action) {
    switch (action.type) {
        case GET_DEPARTMENT:
            return Object.assign({}, state, action.department);

        case GET_CURRENT_DEPARTMENT:
            const currentDepartment = {
                currentDepartment: action.currentDepartment
            };
            return Object.assign({}, state, currentDepartment);

        case DELETE_DEPARTMENT:
            let departments = [];

            for (let department in state) {
                if (state.hasOwnProperty(department)) {
                    if (state[department].id !== action.departmentId) {
                        departments.push(state[department]);
                    }
                }
            }

            return departments;

        default:
            return state;
    }
}

export const department = departmentReducer;
