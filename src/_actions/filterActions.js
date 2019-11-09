import { ADD_FILTER, REMOVE_FILTER, UPDATE_TEXT_FILTER } from '../_constants/filterConstants';

export function addFilter(filter) {
    return {
        type : ADD_FILTER, filter
    }
}

export function removeFilter(filter) {
    return {
        type : REMOVE_FILTER, filter
    }
}

export function updateTextFilter(text) {
    return {
        type : UPDATE_TEXT_FILTER, text
    }
}