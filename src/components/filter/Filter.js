import React from 'react';
import {status} from '../../constants/releaseStatusConstants';

const Filter = (props) => {

    const {filters, textFilter} = props;

    let handleTextFilterChange = (v) => {
        props.updateTextFilter(v)
    }

    let handleFilterClick = (f) => {
        //if the filters array does already contain this filter, then remove it
        if(filters.includes(f)) {
            props.removeExistingFilter(f)
        } else {
            //else add the new filter
            props.addNewFilter(f)
        }
    }

    //loop through the global constant filters/status object
    let filterNodes = Object.keys(status).map( (key, index) => 
        <div key = {index} 
            className = {`status-filter ${ filters.includes(status[key]) ? 'active' : '' }`}
            onClick = {() => handleFilterClick(status[key])} 
        >
            {status[key]}
        </div>
    );


    return (
        <div className='p-3 filter-main'>
            <div className = 'project-name'>Projects / ENV1.5</div>
            <h3>Releases</h3>
            <div className = 'filters'>
                <div className = 'left-filters'>
                    { filterNodes }
                </div>
                <div className = 'right-filters'>
                    <input type = 'text' className = 'search-filter' placeholder = 'Search..' name = 'text_filter'
                        value = {textFilter}
                        onChange = {(e) => handleTextFilterChange(e.target.value)}
                    />
                    <div className = 'search-icon'>
                        <i className = "fa fa-search"></i>
                    </div>
                    {
                        textFilter !== '' ? 
                        <span className = 'clear-text-search' onClick = {() => handleTextFilterChange('')}><i className = "fa fa-close"></i>Clear</span> 
                        : null
                    }
                </div>
            </div>
        </div>
    )

}

export default Filter;