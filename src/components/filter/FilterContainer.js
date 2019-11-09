import React from 'react';
import Filter from './Filter';
import {addFilter, removeFilter} from '../../_actions/filterActions';
import {connect} from 'react-redux';

//Container component provides access to store and dispatching actions to store
const FilterContainer = (props) => <Filter {...props}/>

const mapStateToProps = (store) => {
    const {filters} = store.filterReducer
    return {
        filters
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addNewFilter : function(filter) {
            dispatch(addFilter(filter))
        },
        removeExistingFilter : function(filter) {
            dispatch(removeFilter(filter))
        }
    }
}

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(FilterContainer);
export default connectedComponent;