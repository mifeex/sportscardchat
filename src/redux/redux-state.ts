import { combineReducers, createStore, applyMiddleware } from 'redux';
import commentReducer from './comment-reducer';
import profileReducer, {initialState as postState} from './profile-reducer';
import userReducer from './user-reducer';
import categoriesReducer, {initialState as categoriesState} from './categories-reducer';
import searchReducer, {initialState as searchState} from './search-reducer';
import newPostReducer, {initialState as newPostState} from './newpost-reducer'
import thunk from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';

export interface redux {
	posts: typeof postState
}

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

// window.store = store;

export default store