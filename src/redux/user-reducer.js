import {getAPI} from '../api/getAPI';
import {reset} from 'redux-form';
import {setFetching} from './categories-reducer'

const initialState = {
	userAuthData: {},
	userData: [],
	userPost: [],
	videoPath: [],
	comments: [],
	isAuth: false,
	successUpdate: false,
	isResetting: false,
	isSuccessChanging: false,
	error: '',
	image: '',
}

const userReducer = (state = initialState, action) => {

	let newState = {
		...state,
	};

	newState.userAuthData = {...state.userAuthData}
	newState.userData = {...state.userData}

	const _checkUserAuth = data => {
		if (data.resultCode === 0) {
			newState.isAuth = true;
			newState.isSuccessChanging = false;
			newState.isResetting = false;
		}
		else {
			newState.isAuth = false;
		}

		newState.error = ''

		return newState.userAuthData = data
	}

	const _logoutUser = resultCode => {
		newState.isAuth = false;
		newState.userAuthData = {};
	}

	const _loginWithAPI = link => {
		newState.useLink = link
	}

	const _saveError = error => {
		if (error !== undefined && error !== '' && error !== null) {
			newState.error = error
		}
		
		else {
			newState.error = ''
		}
	}

	const _setUserData = data => {
		newState.userData = data
	}

	const _setUserPosts = posts => {
		newState.userPost = posts
	}

	const _saveNewImage = values => {
		newState.successUpdate = !newState.successUpdate
		newState.image = values.image
	}

	const _saveNewVideo = path => {
		newState.videoPath = path
	}

	const _resetError = () => {
		newState.error = ''
	}

	const _saveResetCode = () => {
		newState.isResetting = true
	}

	const _saveSuccess = () => {
		newState.isSuccessChanging = true
	}

	const _saveComments = data => {
		newState.comments = data
	}

    switch (action.type) {
		case 'LOGIN-USERS':
			_checkUserAuth(action.data);
			_resetError();
			return newState;

		case 'LOGGED-OUT':
			_logoutUser(action.resultCode)
			_resetError();
			return newState

		case 'USING-API':
			_loginWithAPI(action.link)
			_resetError();
			return newState;

		case 'GET-USER-DATA':
			_setUserData(action.data)
			_resetError();
			return newState

		case 'GET-USER-POSTS':
			_setUserPosts(action.posts)
			_resetError();
			return newState

		case 'NEW-IMAGE':
			_saveNewImage(action.values)
			_resetError();
			return newState

		case 'NEW-VIDEO':
			_saveNewVideo(action.path)
			_resetError();
			return newState

		case 'RESET-CODE':
			_saveResetCode()
			return newState

		case 'USER-COMMENT':
			_saveComments(action.data)
			_resetError();
			return newState

		case 'NO-ERROR-ERROR':
			_resetError()
			return newState

		case 'SUCCESS':
			_saveSuccess()
			return newState

		case 'ERROR':
			_saveError(action.error)
			return newState
		default:
			return state;
    }
};

let checkUserAuth = (resultCode, userId, email) => ({type: 'LOGIN-USERS', data: {resultCode, userId, email}})
let getUser = data => ({type: 'GET-USER-DATA', data})
let loggedUserOut = resultCode => ({type: 'LOGGED-OUT', resultCode})
let getUserPosts = posts => ({type: 'GET-USER-POSTS', posts})
let loginWithAPI = link => ({type: 'USING-API', link});
let saveSuccess = () => ({type: 'SUCCESS'})

const saveCode = () => ({type: 'RESET-CODE'})
const saveImage = (image, successUpdate) => ({type: 'NEW-IMAGE', values: {image, successUpdate}})
const saveVideoPath = path => ({type: 'NEW-VIDEO', path})
const setComments = data => ({type: 'USER-COMMENT', data})

export let saveError = error => ({type: 'ERROR', error});
let resetError = () => ({type: 'NO-ERROR'})

export const loginUser = (data, way) => dispatch => {
	setFetching(true)
	getAPI.postValue(data, way)
	.then(data => {
		if (data.resultCode === 0) {
			const {resultCode, userId, email} = data;
			dispatch(checkUserAuth(resultCode, userId, email))
			dispatch(setFetching(false))
		}
	  	else {
	  		dispatch(saveError(data.error))
	  		dispatch(setFetching(false))
	  	}
	})
}

export const isAuth = () => dispatch => {
	setFetching(true)
	getAPI.getAuth()
	.then(data => {
		if (data.resultCode === 0) {
			const { resultCode, userId, email } = data;
			dispatch(checkUserAuth(resultCode, userId, email))
			dispatch(setFetching(false))
		}
		else {
			dispatch(saveError(data.error))
			dispatch(setFetching(false))
		}
	})
}

export const loggedOut = () => dispatch => {
	setFetching(true)
	getAPI.getQueriedParams('logout')
	.then(data => {
		dispatch(loggedUserOut(data.resultCode))
		dispatch(setFetching(false))
	})
}

export const useDiscord = () => dispatch => {
	setFetching(true)
	getAPI.getQueriedParams('use-discord')
	.then(data => {
		dispatch(loginWithAPI(data.url))
		dispatch(setFetching(false))
	})
}

export const redirectWithDiscord = url => dispatch => {
	setFetching(true)
	getAPI.getQueriedParams(`login${url}`)
	.then(data => {
		if (data.resultCode === 0) {
			const {resultCode, userId, email} = data;
			dispatch(checkUserAuth(resultCode, userId, email))
			dispatch(setFetching(false))
		}
		else {
			dispatch(saveError(data.error))
			dispatch(setFetching(false))
		}
	})
}

export const getAll = userId => dispatch => {
	setFetching(true)
	getAPI.getQueriedParams(`get-user/${userId}`)
	.then(data => {
			dispatch(getUserPosts(data.result))
			dispatch(getUser(data.totalCount[0]))
			dispatch(setFetching(false))
	})
}

export const updateProfileImage = (userId, image) => dispatch => {
	const form = new FormData();
	form.append("addedpic", image, image.name)

	setFetching(true)
	getAPI.postImage(form, `update-photo/${userId}`)
	.then(data => {
		if (data.resultCode === 0) {
			dispatch(saveImage(data.newImage, data.isSuccess))
			dispatch(setFetching(false))
		}
		else {
			dispatch(saveError(data.error))
			dispatch(setFetching(false))
		}
	})
}

export const getVideoPath = userId => dispatch => {
	setFetching(true)
	getAPI.getQueriedParams(`videoPath/${userId}`)
	.then(data => {
		dispatch(saveVideoPath(data.result))
		dispatch(setFetching(false))
	})
}

export const addYoutubeVideo = (data, userId) => dispatch => {
	setFetching(true)
	getAPI.postValue({data, userId}, `new/video`)
	.then(data => {
		if (data.resultCode === 0) {
			dispatch(reset('NewVideo'))
			dispatch(resetError())
			dispatch(setFetching(false))
		}
		else {
			dispatch(saveError(data.error))
			dispatch(setFetching(false))
		}
	})
}

export const resetPassword = email => dispatch => {
	setFetching(true)
	getAPI.postValue(email, `password/reset`)
	.then(data => {
		dispatch(reset('reset'))
		dispatch(saveCode())
		dispatch(setFetching(false))
	})
}

export const callPassReset = data => dispatch => {
	setFetching(true)
	getAPI.postValue(data, `password/code/check`)
	.then(data => {
		dispatch(reset('resetPassword'))
		dispatch(saveSuccess())
		dispatch(setFetching(false))
	})
}

export const next = userId => dispatch => {
	setFetching(true)
	getAPI.getQueriedParams(`videoPath/${userId}/next`)
	.then(data => {
		dispatch(saveVideoPath(data.result))
		dispatch(setFetching(false))
	})
}

export const prew = userId => dispatch => {
	setFetching(true)
	getAPI.getQueriedParams(`videoPath/${userId}/prew`)
	.then(data => {
		dispatch(saveVideoPath(data.result))
		dispatch(setFetching(false))
	})
}

export const setInf = userId => dispatch => getAPI.getQueriedParams(`set/influencer/${userId}`)

export const addComment = (userId, value) => dispatch => {
	setFetching(true)
	getAPI.postValue({value, userId}, `new/user/comment`)
	.then(data => {
		dispatch(reset('NewComment'))
		dispatch(setFetching(false))
		dispatch(setComments(data.result))
	})
}

export const showComment = userId => dispatch => {
	setFetching(true);
	getAPI.getQueriedParams(`get/comments/${userId}`)
	.then(data => {
		dispatch(setFetching(false))
		dispatch(setComments(data.result))
	})
}

export default userReducer;