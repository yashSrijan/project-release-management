import { ADD_FILTER, REMOVE_FILTER, UPDATE_TEXT_FILTER } from '../_constants/filterConstants';
import { status } from '../constants/releaseStatusConstants';

const initialState = {
    filters : [ status.INPROGRESS, status.RELEASED, status.UNRELEASED ],
    textFilter : ''
};

export function filterReducer (state = initialState, action) {
    switch (action.type) {
        case ADD_FILTER:
            return {
                ...state,
                filters : [...state.filters, action.filter]
            }
        case REMOVE_FILTER:
            let newArray = state.filters.filter((f) => f !== action.filter)
            return {
                ...state,
                filters : newArray
            }
        case UPDATE_TEXT_FILTER:
            return {
                ...state,
                textFilter : action.text
            }
        default:
            return state
    }
}