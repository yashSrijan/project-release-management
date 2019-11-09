import { ADD_FILTER, REMOVE_FILTER } from '../_constants/filterConstants';
import { status } from '../constants/releaseStatusConstants';

const initialState = {
    filters : [ status.INPROGRESS, status.RELEASED, status.UNRELEASED ]
};

export function filterReducer (state = initialState, action) {
    switch (action.type) {
        case ADD_FILTER:
            return {
                filters : [...state.filters, action.filter]
            }
        case REMOVE_FILTER:
            let newArray = state.filters.filter((f) => f !== action.filter)
            return {
                filters : newArray
            }
        default:
            return state
    }
}