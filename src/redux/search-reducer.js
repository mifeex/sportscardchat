import {getAPI} from '../api/getAPI';

export const initialState = {
	value: '',
}

const searchReducer = (state = initialState, action) => {
	let newState = {...state};

	const _setValue = value => {
		return newState.value = value
	}

	switch (action.type) {

		case 'ENTERED-GLOBAL-DATA':
			_setValue(action.value)
			return newState
			
		default:
			return state;
	}
}

export const getQueriedParams = () => dispatch => {
	console.log('hey')
}

export default searchReducer