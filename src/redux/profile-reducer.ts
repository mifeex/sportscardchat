import {getAPI} from '../api/getAPI';
import {setFetching, getUserPost} from './categories-reducer'

export const initialState = {
	post: [] as Array<getUserPost>,
	popularPost: [] as Array<getUserPost>,
	page: 1,
	limit: 20,
	totalPostCount: 0,
	query: '',
	file: '',
}

interface postBody {
	totalCount?: number;
	result: getUserPost;
	file?: string | undefined 
}

const profileReducer = (state: typeof initialState = initialState, action: any): typeof initialState => {
	let newState = {...state};

	const _addPost = (post: getUserPost) => {
		return newState.post = [post];
	}

	const _checkPage = (page: number) => {
		return newState.page = page
	}

	const _setTotalCount = (totalCount: number) => {
		return newState.totalPostCount = totalCount;
	}

	const _setQuery = (query: string) => {
		return newState.query = query
	}

	const _addFile = (file: string) => {
		return newState.file = file
	}

	const _addPopularPost = (popular: getUserPost) => {
		return newState.popularPost = [popular]
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

let getPost = (post: getUserPost) => ({type: 'CHECK-CATEGORY', post});
let setTotalCount = (count: number | undefined) => ({type: 'SET-TOTAL-COUNT', totalCount: count});
let getPopularPost = (popular: getUserPost) => ({type: 'SET-POPULAR-POST', popular})

let fileValue = (file: string | undefined) => ({type: 'FILE', file});

export let getPage = (page: number) => ({type: 'CHECK-PAGE', page});
export let setQuery = (query: string) =>({type: 'ENTERED-DATA', query})

export const getCategoryPost = (params:string) => (dispatch: Function) => {
	setFetching(true)
	getAPI.getCategory(params)
	.then((data: postBody) => {
		dispatch(fileValue(data.file))
		dispatch(getPost(data.result))
		dispatch(setTotalCount(data.totalCount))
		dispatch(setFetching(false))
	})
}

export const setPopularPost = () => (dispatch: Function) => {
	setFetching(true)
	getAPI.getQueriedParams('get/popular-post')
	.then((data: postBody) => {
		dispatch(getPopularPost(data.result))
		dispatch(setFetching(false))
	})
}

export const getQueriedPost = (query:string, category:string) => (dispatch: Function) => {
	setFetching(true)
	getAPI.getQueriedParams(`search-in-posts/category/${category}?q=${query}&limit=${initialState.limit}&page=${initialState.page}`)
	.then((data: postBody) => {
		dispatch(getPost(data.result))
		dispatch(setTotalCount(data.totalCount))
		dispatch(setFetching(false))
	})
}

export default profileReducer