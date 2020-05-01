import {getAPI, params} from '../api/getAPI';

export const initialState = {
    post: [],
    page: 1,
    limit: 1,
    totalPostCount: 0
}

const profileReducer = (state = initialState, action) => {
	let newState = {...state};

	const _addPost = post => {
		return newState.post = [post];
	}

	const _checkPage = page => {
		return newState.page = page
	}

	const _setTotalCount = totalCount => {
		return newState.totalPostCount = totalCount;
	}

	switch (action.type) {
		case 'CHECK-CATEGORY':
			_addPost(action.post)
			return newState;
		case 'CHECK-PAGE':
			_checkPage(action.page)
			return newState;
		case 'SET-TOTAL-COUNT':
			_setTotalCount(action.totalCount)
			return newState;
		default:
			return state;
	}
}

let getPost = post => ({type: 'CHECK-CATEGORY', post});
let setTotalCount = count => ({type: 'SET-TOTAL-COUNT', totalCount: count});

export let getPage = page => ({type: 'CHECK-PAGE', page});

export const getCategoryPost = (params) => {
	return dispatch => {
		getAPI.getCategory(params)
		.then(data => {
			dispatch(getPost(data.result))
			dispatch(setTotalCount(data.totalCount))
		})
	}
}

export default profileReducer