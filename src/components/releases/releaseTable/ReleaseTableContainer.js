import React from 'react';
import {connect} from 'react-redux';

import {ReleaseTable} from './ReleaseTable';
import {removeRelease} from '../../../_actions/releaseActions';

//Container component provides access to store and dispatching actions to store
const ReleaseTableContainer = (props) => <ReleaseTable {...props}/>

const mapStateToProps = (store) => {
    return {
        filters : store.filterReducer.filters
    }
}

const mapDispatchToProps = (dispatch) => ({
    removeExistingRelease : function(releaseId) {
        dispatch(removeRelease(releaseId))
    }
})

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(ReleaseTableContainer);
export default connectedComponent;