import { combineReducers, createStore, applyMiddleware } from 'redux'
import commentReducer from './comment-reducer'
import profileReducer from './profile-reducer'
import userReducer from './user-reducer'
import categoriesReducer from './categories-reducer'
import thunk from 'redux-thunk'

const reducers = combineReducers({
	categories: categoriesReducer,
	posts: profileReducer,
	comments: commentReducer,
	userdata: userReducer,
})

const store = createStore(reducers, applyMiddleware(thunk))

window.store = store;

export default store