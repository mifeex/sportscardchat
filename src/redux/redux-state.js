import { combineReducers, createStore, applyMiddleware } from 'redux';
import commentReducer from './comment-reducer';
import profileReducer from './profile-reducer';
import userReducer from './user-reducer';
import categoriesReducer from './categories-reducer';
import searchReducer from './search-reducer';
import newPostReducer from './newpost-reducer'
import thunk from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';

const reducers = combineReducers({
	categories: categoriesReducer,
	posts: profileReducer,
	comments: commentReducer,
	userdata: userReducer,
	search: searchReducer,
	form: formReducer,
	newPost: newPostReducer,
})

const store = createStore(reducers, applyMiddleware(thunk))

window.store = store;

export default store