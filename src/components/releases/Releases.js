import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import uuid from 'uuid';

import {status} from '../../constants/releaseStatusConstants';
import ReleaseTableContainer from './releaseTable/ReleaseTableContainer';

const Releases = (props) => {

    //console.log('props in Releases : ', props)

    let [startDate, setStartDate] = React.useState( null )
    let [releaseDate, setReleaseDate] = React.useState( null )
    let [versionName, setVersionName] = React.useState( '' )
    let [description, setDescription] = React.useState( '' )
    let [progress, setProgress] = React.useState(0)
    let [errors, setErrors] = React.useState({dateError : '', nameError : ''})
    let [editId, setEditId] = React.useState(null)

    //prepopulate the input fields with the available data for this release
    let onPencilClick = (release) => {
        //errors should be set to none
        setErrors({dateError : '', nameError : ''})
        
        setEditId(release.id)
        setVersionName(release.versionName)
        setDescription(release.description)
        setProgress(release.progress)
        setStartDate(release.startDate)
        setReleaseDate(release.releaseDate === '' ? null : release.releaseDate)
    }

    let validateForm = () => {
        let formValid = true, errorsObj = {dateError : '', nameError : ''}, existing, oldRelease;
        let s = startDate, r = releaseDate;

        //if only spaces are entered
        if(versionName.trim() === '') {
            errorsObj.nameError = 'Please choose a valid version name.'
            formValid = false;
        }

        //if this is the edit form then create dates in Date format from MM/dd/yyyy format (that is stored in reducer) and find the oldRelease
        if(editId) {
            s = new Date(Date.parse(s))
            r = new Date(Date.parse(r))
            oldRelease = props.releases.find(release => release.id === editId)
        }

        //check that date fields are not empty
        if(s === null) {
            errorsObj.dateError = 'Please provide a valid start date.'
            formValid = false;
        } else if ( r !== null && r < s) {
            //check that release date is not less than start date
            errorsObj.dateError = 'Release date can\'t be less than start date.'
            formValid = false;
        }

        //only do the unique version name check if this is NOT the edit form 
        //OR the provided versionName is not the same as before
        if(!editId || oldRelease.versionName !== versionName.trim()) {
            //check for valid version name, if an existing release is there then set the error
            existing = props.releases.find( release => release.versionName === versionName.trim() )
            if(existing) {
                errorsObj.nameError = 'Please provide a unique version name.'
                formValid = false;
            }
        }

        //set the errors object
        setErrors(errorsObj)

        //finally return the bool flag for form validation
        return formValid
    }

    let formatDate = (date) => {
        //if the parameter date received is a string then this must have been the edit form call
        //convert the date tring to unix epoch time and then to an actual date object
        if(typeof(date) === 'string') {
            date = new Date( Date.parse(date) );
        }
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        return month + '/' + day + '/' + year;
    }
    
    let findStatus = ( progress ) => {
        progress = parseInt(progress, 10)
        return progress === 0 ? status.INPROGRESS : (
            progress === 100 ? status.RELEASED : status.UNRELEASED
        )
    }

    let onCreateFormSubmit = (e) => {
        e.preventDefault()
        if(validateForm()) {
            let releaseObject = {
                id : uuid.v4(),
                versionName : versionName.trim(), 
                startDate : formatDate(startDate), 
                releaseDate : releaseDate !== null ? formatDate(releaseDate) : '',
                description : description.trim(),
                progress, status : findStatus(progress)
            }
            props.addNewRelease(releaseObject)
            clearForm();
        }
    }

    let onEditFormSubmit = (e) => {
        e.preventDefault()
        if(validateForm()) {
            let releaseObject = {
                id : editId,
                versionName : versionName.trim(), 
                startDate : formatDate(startDate), 
                releaseDate : releaseDate !== null ? formatDate(releaseDate) : '',
                description : description.trim(),
                progress, status : findStatus(progress)
            }
            props.updateExistingRelease(releaseObject)
            clearForm();
        }
    }

    //form should be cleared after creating a new entry or updating an existing one
    let clearForm = () => {
        setStartDate(null); setReleaseDate(null); setVersionName(''); setDescription(''); setProgress(0);
        setEditId(null);
    }

    //conditional rendering of the progress field
    let progressField = editId ? (
        <div className='col-2'>
            <input type='number' className='form-control' placeholder='Progress' required min = '0' max = '100'
                value = {progress} onChange = {(e) => setProgress(e.target.value)}
            />
        </div>
    ) : null
    
    return (
        <div className='releases-main'>
            <div className = 'main-top'>
                <ReleaseTableContainer 
                    releases = {props.releases} onPencilClick = {onPencilClick}
                />
            </div>
            <div className = 'main-bottom'>
                <form onSubmit = {(e) => {editId ? onEditFormSubmit(e) : onCreateFormSubmit(e)}} className = 'custom-form'>
                    <div className='form-row'>
                        {/*Make space for progress field if this is the edit form*/}
                        <div className={ ` ${editId ? 'col-3' : 'col-5'} ` }>
                            <input type='text' className='form-control' placeholder='Version Name' required
                                value = {versionName} onChange = {(e) => setVersionName(e.target.value)}
                            />
                        </div>
                        {progressField}
                        <div className='col-2'>
                            <DatePicker
                                className = 'form-control'
                                placeholderText = 'Start Date'
                                selected = {Date.parse(startDate)}
                                onChange={(v) => setStartDate(v)}
                            />
                        </div>
                        <div className='col-2'>
                            <DatePicker
                                className = 'form-control'
                                placeholderText = 'Release Date'
                                selected = {Date.parse(releaseDate)}
                                onChange={(v) => setReleaseDate(v)}
                            />
                        </div>
                        <div className='col-2'>
                            <input type='text' className='form-control' placeholder='Description' required
                                value = {description} onChange = {(e) => {setDescription(e.target.value)} }
                            />
                        </div>
                        <div className='col-1'>
                            <button type='submit' className='btn btn-primary' style = {{width:'100%'}}>
                                { editId ? 'Edit' : 'Add' }
                            </button>
                        </div>
                    </div>
                </form>
                <div className = 'errors'>
                    <span>{errors.dateError}</span> <span>{errors.nameError}</span> 
                </div>
            </div>
        </div>
    )
}

export default Releases;