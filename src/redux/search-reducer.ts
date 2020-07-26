import {getAPI} from '../api/getAPI';
import {getUserPost} from './categories-reducer'

interface searchType {
	result2: getUserPost
}

export const initialState = {
	value: [] as Array<getUserPost>,
	isSearchSuccess: false,
}

const searchReducer = (state: typeof initialState = initialState, action: any): typeof initialState => {
	let newState = {...state};

	const _setValue = (results:getUserPost) => {
		newState.isSearchSuccess = true
		return newState.value = [results]
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

let findValues = (results:getUserPost) => ({type: 'ENTERED-GLOBAL-DATA', results})

export const Search = (data:string) => (dispatch:Function) => {
	getAPI.postValue(data.search, 'search')
	.then((data:searchType) => {
		dispatch(findValues(data.result2))
	})
}

export default searchReducer