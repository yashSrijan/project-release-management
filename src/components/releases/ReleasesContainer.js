import React from 'react';
import Releases from './Releases';
import {setReleases, updateRelease} from '../../_actions/releaseActions';
import {connect} from 'react-redux';

//Container component provides access to store and dispatching actions to store
const ReleasesContainer = (props) => <Releases {...props}/>

const mapStateToProps = (store) => {
    const {releases} = store.releaseReducer
    return {
        releases
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addNewRelease : function(release) {
            dispatch(setReleases(release))
        },
        updateExistingRelease : function(updatedRelease) {
            dispatch(updateRelease(updatedRelease))
        }
    }
}

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(ReleasesContainer);
export default connectedComponent;