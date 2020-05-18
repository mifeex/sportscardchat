import {getAPI} from '../api/getAPI';

export const initialState = {
	value: [],
	isSearchSuccess: false,
}

const searchReducer = (state = initialState, action) => {
	let newState = {...state};

	const _setValue = results => {
		newState.isSearchSuccess = true
		return newState.value = results
	}

	setTimeout(() => {
		newState.isSearchSuccess = false
	}, 7500)

	switch (action.type) {

		case 'ENTERED-GLOBAL-DATA':
			_setValue(action.results)
			return newState
			
		default:
			return state;
	}
}

let findValues = results => ({type: 'ENTERED-GLOBAL-DATA', results})

export const Search = data => dispatch => {
	getAPI.postValue(data.search, 'search')
	.then(data => {
		dispatch(findValues(data.result2))
	})
}

export default searchReducer