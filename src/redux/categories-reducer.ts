import {getAPI} from '../api/getAPI';
export let SET_TYPE = ''

interface Influencer {
	date: string;
	hasInfluencers: number;
	id: number;
	username: string;
}

interface InfluencerData {
	totalCount: number[];
	result: Influencer;
	resultCode?: number
}

export interface getUserPost {
	category: string;
	counts: number;
	date: string;
	id: number;
	post: string;
	postId: number;
	tag: string;
	userId: number;
	username: string;
}

export const initialState = {
    categories: [] as Array<getUserPost>,
    influencers: [] as Array<Influencer>,
    isFetching: true,
}

const categoriesReducer = (state: typeof initialState = initialState, action: any): typeof initialState => {
	let newState = {...state};

	const _addCategory = (category: getUserPost) => {
		newState.categories = [category]
	}

	const _saveInfluencer = (data: Influencer) => {
		newState.influencers = [data]
	}

	const _setFetching = (fetching: boolean) => {
		newState.isFetching = fetching
	}

	switch (action.type) {
		case 'ADD-CATEGORY':
			_addCategory(action.category)
			return newState;

		case 'SAVE-INFLUENCER':
			_saveInfluencer(action.data)
			return newState

		case 'SET-FETCHING':
			_setFetching(action.fetching)
			return newState

		default:
			return state;
	}
}

export let addCategory = (category: getUserPost) => ({type: 'ADD-CATEGORY', category})
export const setFetching = (fetching: boolean) => ({type: 'SET-FETCHING', fetching})
const saveInfluencer = (count:number, influencer: Influencer) => ({type: 'SAVE-INFLUENCER', data: {count, influencer}})

export const getCategories = () => (dispatch: Function) => {
	setFetching(true)
	getAPI.callMain()
	.then((data: getUserPost) => {
		dispatch(setFetching(false))
		dispatch(addCategory(data))
	})
}

export const getInfluencers = () => (dispatch: Function) => {
	setFetching(true)
	getAPI.getQueriedParams('get-influencer')
	.then((data: InfluencerData) => {
		const {resultCode, totalCount, result} = data
		if (resultCode === 0) {
			dispatch(setFetching(false))
			dispatch(saveInfluencer(totalCount[0], result))
		}
	})
}

export default categoriesReducer