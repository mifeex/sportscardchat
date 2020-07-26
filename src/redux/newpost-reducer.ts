import {getAPI} from '../api/getAPI';

interface newPostIncludes {
	category: string;
	message: string;
	tag: string;
}

interface newPostData {
	e: newPostIncludes;
	form: any
}

interface posting {
	resultCode: number;
	error?: string;
	isAddedSuccess?: boolean
}

export const initialState = {
	preview: false,
	previewText: '',
	error: '',
	isAddedSuccess: false,
}

const newPostReducer = (state: typeof initialState = initialState, action: any): typeof initialState => {
	let newState = {...state};

	const _changePreview = (bool: boolean) => {
		return newState.preview = bool
	}

	const _showPreview = (text: string) => {
		return newState.previewText = text
	}

	const _saveError = (error: string) => {
		if (error !== undefined && error !== '' && error !== null) {
			newState.previewText = ""
			newState.error = error
		}
		
		else {
			newState.error = ''
		}
	}

	const _addSuccess = (success: boolean) => {
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

export const showPreviewStatus = (bool: boolean)  => ({type: 'CHANGE-PREVIEW-STATUS', bool})
export const showPreview = (text: string)  => ({type: 'SHOW-PREVIEW', text})
export let successPosting = (success: boolean | undefined) => ({type: 'SUCCESS', success});
let saveError = (error: string | undefined) => ({type: 'ERROR', error});

export const addNewPost = (data: newPostData) => (dispatch: Function) => {

	const {category, message, tag} = data.e

	getAPI.postImage(data.form, `new-post/${tag}`)
	.then((data: posting) => {
		if (data.resultCode === 1) {
			dispatch(saveError(data.error))
		}
	})

	getAPI.postValue({category, message, tag}, `new-post/${tag}`)
	.then((data: posting) => {
		if (data.resultCode === 0) {
			dispatch(successPosting(data.isAddedSuccess))
		}
	  	else {
	  		dispatch(saveError(data.error))
	  	}
	})
}

export default newPostReducer