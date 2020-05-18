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

	const _saveError = error => {
		if (error !== undefined && error !== '' && error !== null) {
			newState.previewText = ""
			newState.error = error
		}
		
		else {
			newState.error = ''
		}
	}

	const _addSuccess = success => {
		newState.previewText = ""
		return newState.isAddedSuccess = success;
	}

	switch (action.type) {

		case 'CHANGE-PREVIEW-STATUS':
			_changePreview(action.bool)
			return newState
			
		case 'SHOW-PREVIEW':
			_showPreview(action.text)
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
export let successPosting = success => ({type: 'SUCCESS', success});
let saveError = error => ({type: 'ERROR', error});

export const addNewPost = (data) => dispatch => {

	const {category, message, tag} = data.e

	getAPI.postImage(data.form, `new-post/${tag}`)
	.then(data => {
		if (data.resultCode === 1) {
			dispatch(saveError(data.error))
		}
	})

	getAPI.postValue({category, message, tag}, `new-post/${tag}`)
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