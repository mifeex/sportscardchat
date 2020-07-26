import {getAPI} from '../api/getAPI';
import {setFetching} from './categories-reducer'

export const initialState = {
	commentsData: [],
	postData: [],
	newCommentText: '', 
}

const commentReducer = (state = initialState, action) => {
	let newState = {...state};
	newState.commentsData = [...state.commentsData]

	const _getComments = (data) => newState.commentsData = [data];

	const _getPost = (data) => newState.postData = [data];

	const _setComments = (comment) => newState.commentsData[0].push(comment)

	switch (action.type) {
		case 'GET-COMMENT':
			_getComments(action.data);
			return newState;

		case 'GET-POST':
			_getPost(action.data);
			return newState;

		case 'ADD-COMMENT':
			_setComments(action.comment);
			return newState;

		default:
			return state;
	}
}

let getComment = (comment) => ({type: 'GET-COMMENT', data: comment})
let getPost = (post) => ({type: 'GET-POST', data: post})
export const addPost = (comment) => ({type: 'ADD-COMMENT', comment})

export const getComments = (postId) => (dispatch) => {
	setFetching(true)
	getAPI.getQueriedParams(`post/${postId}`)
	.then((data) => {
		dispatch(setFetching(false))
		dispatch(getPost(data.totalCount))
		dispatch(getComment(data.result))
	})
}


export default commentReducer;