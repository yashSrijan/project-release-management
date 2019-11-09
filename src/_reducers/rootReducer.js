import {combineReducers} from 'redux'
import {releaseReducer} from './releaseReducer'
import {filterReducer} from './filterReducer'

const rootReducer = combineReducers({
    releaseReducer, filterReducer
})

export default rootReducer;