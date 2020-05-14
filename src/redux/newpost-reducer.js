import {getAPI} from '../api/getAPI';

export const initialState = {
	preview: false,
	previewText: '',
	error: '',
	isAddedSuccess: false,
}

const newPostReducer = (state = initialState, action) => {
	let newState = {...state};

	const _changePreview = bool => {
		return newState.preview = bool
	}

	const _showPreview = text => {
		return newState.previewText = text
	}

	const _addBeautify = element => {
		newState.previewText += `${element}`
		return newState.previewText
	}

	const _saveError = error => {
		if (error !== undefined && error !== '' && error !== null) {
			newState.error = error
		}
		
		else {
			newState.error = ''
		}
	}

	const _addSuccess = success => {
		return newState.isAddedSuccess = success;
	}

	switch (action.type) {

		case 'CHANGE-PREVIEW-STATUS':
			_changePreview(action.bool)
			return newState
			
		case 'SHOW-PREVIEW':
			_showPreview(action.text)
			return newState

		case 'ADD-BEAUTIFY':
			_addBeautify(action.element)
			return newState

		case 'SUCCESS':
			_addSuccess(action.success);
			return newState

		case 'ERROR':
			_saveError(action.error)
			return newState

		default:
			return state;
	}
}

export const showPreviewStatus = bool  => ({type: 'CHANGE-PREVIEW-STATUS', bool})
export const showPreview = text  => ({type: 'SHOW-PREVIEW', text})
export const useAddPostBeautify = element => ({type: 'ADD-BEAUTIFY', element})
let saveError = error => ({type: 'ERROR', error});
export let successPosting = success => ({type: 'SUCCESS', success})

export const addNewPost = (data, way) => dispatch => {

	const {category, message, tag} = data.e

	// await 
	// getAPI.postImage(data.form, way)
	// .then(data => {
	// 	if (data.resultCode === 0) {

	// 	}
	// 	else {
	// 		dispatch(saveError(data.error))
	// 	}
	// })

	// await 
	getAPI.postValue({category, message, tag}, way)
	.then(data => {
		if (data.resultCode === 0) {
			dispatch(successPosting(data.isAddedSuccess))
		}
	  	else {
	  		dispatch(saveError(data.error))
	  	}
	})
}

export default newPostReducer