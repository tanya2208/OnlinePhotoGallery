import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import authReducer from './reducers/auth'
import userReducer from './reducers/user'
import postReducer from './reducers/post'
import postsReducer from './reducers/posts'

const rootReducer = combineReducers({
  authReducer,
  userReducer,
  postReducer,
  postsReducer
})

export default configureStore({reducer: rootReducer})
