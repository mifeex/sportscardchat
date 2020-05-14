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

	const _addComment = () => {
	  	let newPost = {
			id: 4,
			tag: "Hello world!",
			text: newState.newCommentText,
			date: new Date().toLocaleTimeString(),
			inReply: true
	  	}

		newState.commentsData.push(newPost)
		_newText("")
	}

	const _getComments = data => newState.commentsData = [data];

	const _getPost = data => newState.postData = [data];

	switch (action.type) {
		case 'ADD-COMMENT':
			_addComment()
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

export const getComments = postId => dispatch => {
	getAPI.getQueriedParams(`post/${postId}`)
	.then(data => {
		dispatch(getPost(data.totalCount))
		dispatch(getComment(data.result))
	})
}


export default commentReducer;