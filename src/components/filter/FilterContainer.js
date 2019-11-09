import React from 'react';
import Filter from './Filter';
import {addFilter, removeFilter, updateTextFilter} from '../../_actions/filterActions';
import {connect} from 'react-redux';

//Container component provides access to store and dispatching actions to store
const FilterContainer = (props) => <Filter {...props}/>

const mapStateToProps = (store) => {
    const {filters, textFilter} = store.filterReducer
    return {
        filters, textFilter
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addNewFilter : function(filter) {
            dispatch(addFilter(filter))
        },
        removeExistingFilter : function(filter) {
            dispatch(removeFilter(filter))
        },
        updateTextFilter : function(text) {
            dispatch(updateTextFilter(text))
        }
    }
}

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(FilterContainer);
export default connectedComponent;