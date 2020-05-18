import {getAPI} from '../api/getAPI';

const initialState = {
	commentsData: [],
	postData: [],
	newCommentText: '', 
}

const commentReducer = (state = initialState, action) => {
	let newState = {...state};
	newState.commentsData = [...state.commentsData]

	const _newText = text => {
		newState.newCommentText = text
	}

	const _addComment = newPost => {
		newState.commentsData[0].push(newPost)
	}

	const _getComments = data => newState.commentsData = [data];

	const _getPost = data => newState.postData = [data];

	switch (action.type) {
		case 'ADD-COMMENT':
			_addComment(action.newPost)
			return newState;

		case 'ADD-TEXT':
			_newText(action.text)
			return newState;

		case 'GET-COMMENT':
			_getComments(action.data);
			return newState;

		case 'GET-POST':
			_getPost(action.data);
			return newState;

		default:
			return state;
	}
}

let getComment = comment => ({type: 'GET-COMMENT', data: comment})
let getPost = post => ({type: 'GET-POST', data: post})
export let addPost = value => ({type: 'ADD-COMMENT', newPost: value});

export const getComments = postId => dispatch => {
	getAPI.getQueriedParams(`post/${postId}`)
	.then(data => {
		dispatch(getPost(data.totalCount))
		dispatch(getComment(data.result))
	})
}


export default commentReducer;