import { combineReducers } from 'redux'

import blogs from './blogsReducer'
import tags from './tagsReducer'

export default combineReducers({
    blogs,
    tags
})