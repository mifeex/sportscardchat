import {getAPI} from '../api/getAPI';

export const initialState = {
	post: [],
	popularPost: [],
	page: 1,
	limit: 20,
	totalPostCount: 0,
	query: '',
	file: '',
}

const profileReducer = (state = initialState, action) => {
	let newState = {...state};

	const _addPost = post => {
		return newState.post = post;
	}

	const _checkPage = page => {
		return newState.page = page
	}

	const _setTotalCount = totalCount => {
		return newState.totalPostCount = totalCount;
	}

	const _setQuery = query => {
		return newState.query = query
	}

	const _addFile = file => {
		return newState.file = file
	}

	const _addPopularPost = popular => {
		return newState.popularPost = popular
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

		case 'FILE':
			_addFile(action.file);
			return newState

		case 'SET-POPULAR-POST':
			_addPopularPost(action.popular);
			return newState

		case 'ENTERED-DATA':
			_setQuery(action.query)
			return newState
			
		default:
			return state;
	}
}

let getPost = post => ({type: 'CHECK-CATEGORY', post});
let setTotalCount = count => ({type: 'SET-TOTAL-COUNT', totalCount: count});
let getPopularPost = popular => ({type: 'SET-POPULAR-POST', popular})

let fileValue = file => ({type: 'FILE', file});

export let getPage = page => ({type: 'CHECK-PAGE', page});
export let setQuery = query =>({type: 'ENTERED-DATA', query})

export const getCategoryPost = (params) => dispatch => {
	getAPI.getCategory(params)
	.then(data => {
		dispatch(fileValue(data.file))
		dispatch(getPost(data.result))
		dispatch(setTotalCount(data.totalCount))
	})
}

export const setPopularPost = () => dispatch => {
	getAPI.getQueriedParams('get/popular-post')
	.then(data => {
		dispatch(getPopularPost(data.result))
	})
}

export const getQueriedPost = (query, category) => dispatch => {
	getAPI.getQueriedParams(`search-in-posts/category/${category}?q=${query}&limit=${initialState.limit}&page=${initialState.page}`)
	.then(data => {
		dispatch(getPost(data.result))
		dispatch(setTotalCount(data.totalCount))
	})
}

export default profileReducer