import React from 'react';
import {Status, Progress} from '../statusAndProgress/StatusAndProgress';

export const ReleaseTable = (props) => {
    const {releases, filters, textFilter} = props;
    let filterFlag = false;
    if (filters.length) {
        filterFlag = true
    }

    const createRow = (release) => {
        const row = 
            <tr key = {release.id}>
                <td>{release.versionName}</td>
                <td>
                    <Status status = {release.status}/>
                </td>
                <td style = {{verticalAlign : 'middle'}}>
                    <Progress progress = {release.progress}/>
                </td>
                <td>{release.startDate}</td>
                <td>{release.releaseDate === '' ? '--' : release.releaseDate}</td>
                <td>{release.description}</td>
                <td>
                    {/*Render action icons*/}
                    <i className = 'release-action fa fa-pencil' onClick = { () => props.onPencilClick(release)} title = 'Edit'></i>
                    <i className = 'release-action fa fa-trash' onClick = { () => props.removeExistingRelease(release.id)} title = 'Delete'></i>                     
                </td>
            </tr>
        return row
    }

    const filterByText = (release) => {
        //textFilter works case insensitive
        const tf = textFilter.toLowerCase()
        const row = 
        (release.versionName.toLowerCase().includes(tf) || release.description.toLowerCase().includes(tf)) ?
        (
            createRow(release)
        ) : null
        return row
    }

    const filterByStatus = (release) => {
        const row =
        (filterFlag && filters.includes(release.status)) ? 
        (
            textFilter === '' ? createRow(release) : filterByText(release)
        ) : null
        return row
    }

    return (
        <table className='table table-hover'>
            <thead className='custom-table-heading'>
                <tr>
                    <th scope='col'>Version</th>
                    <th scope='col'>Status</th>
                    <th scope='col'>Progress</th>
                    <th scope='col'>Start Date</th>
                    <th scope='col'>Release Date</th>
                    <th scope='col'>Description</th>
                    <th scope='col'>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    releases.map( (release) => filterByStatus(release) )
                }
            </tbody>
        </table>
    )
}