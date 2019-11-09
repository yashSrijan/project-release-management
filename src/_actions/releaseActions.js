import {SET_RELEASES, REMOVE_RELEASE, UPDATE_RELEASE} from '../_constants/releaseConstants';

export function setReleases(release) {
    return {
        type : SET_RELEASES, release
    }
}

export function removeRelease(releaseId) {
    return {
        type : REMOVE_RELEASE, releaseId
    }
}

export function updateRelease(updatedRelease) {
    return {
        type : UPDATE_RELEASE, updatedRelease
    }
}