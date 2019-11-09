import React from 'react'

export const Status = ({status}) => <span className = { `status ${status.replace(/ /g,'')} ` }> {status} </span>

export const Progress = ({progress}) => {
    progress = parseInt(progress, 10)
    let component = (progress === 0 || progress === 100) ? 
        <div className = { `progress-full ${progress === 0 ? 'incomplete' : 'complete'}` }>
            &nbsp;
        </div> : (
            <div className = 'progress-td'>
                <span style = {{width : progress + '%'}} className = 'progress-c complete'>
                    &nbsp;
                </span>
                <span style = {{width : (100 - progress) + '%'}} className = 'progress-ic incomplete'>
                
                </span>
            </div>
        )
    return component;
}