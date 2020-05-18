import {getAPI} from '../api/getAPI';

const initialState = {
    categories: [],
    influencers: [],
}

const categoriesReducer = (state = initialState, action) => {
	let newState = {...state};
	newState.categories = [...state.categories];

	const _addCategory = (category) => {
		category.map(el => {
			if (newState.categories.length < 4) {
				el.post = ' '
				newState.categories.push(el)
			}
		})
	}

	const _saveInfluencer = data => {
		newState.influencers = data
	}

	switch (action.type) {
		case 'ADD-CATEGORY':
			_addCategory(action.category)
			return newState;

		case 'SAVE-INFLUENCER':
			_saveInfluencer(action.data)
			return newState

		default:
			return state;
	}
}

export let addCategory = category => ({type: 'ADD-CATEGORY', category: category})
const saveInfluencer = data => ({type: 'SAVE-INFLUENCER', data})

export const getCategories = () => dispatch => {
	getAPI.callMain()
	.then(data => {
		dispatch(addCategory(data))
	})
}

export const getInfluencers = () => dispatch => {
	getAPI.getQueriedParams('get-influencer')
	.then(data => {
		if (data.resultCode === 0) {
			dispatch(saveInfluencer(data))
		}
	})
}

export default categoriesReducer