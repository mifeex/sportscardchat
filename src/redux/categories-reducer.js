import {getAPI} from '../api/getAPI';

const initialState = {
    categories: [],
}

const categoriesReducer = (state = initialState, action) => {
	let newState = {...state};
	newState.categories = [...state.categories];

	const _addCategory = (category) => {
		category.map(el => {
			if (newState.categories.length < 4) {
				return newState.categories.push(el)
			}
		})
		
	}

	switch (action.type) {
		case 'ADD-CATEGORY':
			_addCategory(action.category)
			return newState;
		default:
			return state;
	}
}

export let addCategory = category => ({type: 'ADD-CATEGORY', category: category})

export const getCategories = () => dispatch => {
	getAPI.callMain()
	.then(data => {
		dispatch(addCategory(data))
	})
}

export default categoriesReducer