import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import authReducer from './reducers/auth'
import userReducer from './reducers/user'

const rootReducer = combineReducers({
  authReducer,
  userReducer
})

export default configureStore({reducer: rootReducer})
