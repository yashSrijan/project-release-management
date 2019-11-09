import {  SET_RELEASES, REMOVE_RELEASE, UPDATE_RELEASE  } from '../_constants/releaseConstants';

const initialState = {
    releases: []
};

export function releaseReducer (state = initialState, action) {
    switch (action.type) {
        case SET_RELEASES:
            return {
                releases : [...state.releases, action.release]
            };
        case REMOVE_RELEASE:
            let newArray = state.releases.filter((release) => release.id !== action.releaseId)
            return {
                releases : newArray
            }
        case UPDATE_RELEASE:
            let updatedArray = state.releases.map((release) => {
                if(release.id === action.updatedRelease.id) {
                    return action.updatedRelease
                }
                return release;
            });
            return {
                releases : updatedArray
            } 
        default:
            return state
    }
}