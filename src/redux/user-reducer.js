import {getAPI} from '../api/getAPI';
import {reset} from 'redux-form';

const initialState = {
	userAuthData: {},
	userData: [],
	userPost: [],
	videoPath: [],
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

export let saveError = error => ({type: 'ERROR', error});
let resetError = () => ({type: 'NO-ERROR'})

export const loginUser = (data, way) => dispatch => {
	getAPI.postValue(data, way)
	.then(data => {
		if (data.resultCode === 0) {
			const {resultCode, userId, email} = data;
			dispatch(checkUserAuth(resultCode, userId, email))
		}
	  	else {
	  		dispatch(saveError(data.error))
	  	}
	})
}

export const isAuth = () => dispatch => {
	getAPI.getAuth()
	.then(data => {
		if (data.resultCode === 0) {
			const { resultCode, userId, email } = data;
			dispatch(checkUserAuth(resultCode, userId, email))
		}
		else {
			dispatch(saveError(data.error))
		}
	})
}

export const loggedOut = () => dispatch => {
	getAPI.getQueriedParams('logout')
	.then(data => {
		dispatch(loggedUserOut(data.resultCode))
	})
}

export const useDiscord = () => dispatch => {
	getAPI.getQueriedParams('use-discord')
	.then(data => {
		dispatch(loginWithAPI(data.url))
	})
}

export const redirectWithDiscord = url => dispatch => {
	getAPI.getQueriedParams(`login${url}`)
	.then(data => {
		if (data.resultCode === 0) {
			const {resultCode, userId, email} = data;
			dispatch(checkUserAuth(resultCode, userId, email))
		}
		else {
			dispatch(saveError(data.error))
		}
	})
}

export const getAll = userId => dispatch => {
	getAPI.getQueriedParams(`get-user/${userId}`)
	.then(data => {
			dispatch(getUserPosts(data.result))
			dispatch(getUser(data.totalCount[0]))
	})
}

export const updateProfileImage = (userId, image) => dispatch => {
	const form = new FormData();
	form.append("addedpic", image, image.name)

	getAPI.postImage(form, `update-photo/${userId}`)
	.then(data => {
		if (data.resultCode === 0) {
			dispatch(saveImage(data.newImage, data.isSuccess))
		}
		else {
			dispatch(saveError(data.error))
		}
	})
}

export const getVideoPath = userId => dispatch => {
	getAPI.getQueriedParams(`videoPath/${userId}`)
	.then(data => {
		dispatch(saveVideoPath(data.result))
	})
}

export const addYoutubeVideo = (data, userId) => dispatch => {
	getAPI.postValue({data, userId}, `new/video`)
	.then(data => {
		if (data.resultCode === 0) {
			dispatch(reset('NewVideo'))
			dispatch(resetError())
		}
		else {
			dispatch(saveError(data.error))
		}
	})
}

export const resetPassword = email => dispatch => {
	getAPI.postValue(email, `password/reset`)
	.then(data => {
		dispatch(reset('reset'))
		dispatch(saveCode())
	})
}

export const callPassReset = data => dispatch => {
	getAPI.postValue(data, `password/code/check`)
	.then(data => {
		dispatch(reset('resetPassword'))
		dispatch(saveSuccess())
	})
}

export const next = userId => dispatch => {
	getAPI.getQueriedParams(`videoPath/${userId}/next`)
	.then(data => {
		dispatch(saveVideoPath(data.result))
	})
}

export const prew = userId => dispatch => {
	getAPI.getQueriedParams(`videoPath/${userId}/prew`)
	.then(data => {
		dispatch(saveVideoPath(data.result))
	})
}

export const setInf = userId => dispatch => getAPI.getQueriedParams(`set/influencer/${userId}`)

export default userReducer;