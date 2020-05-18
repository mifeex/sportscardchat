import {getAPI} from '../api/getAPI';

const initialState = {
	userAuthData: {},
	userData: [],
	userPost: [],
	isAuth: false,
	error: '',
	successUpdate: false,
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
		newState.error = ''
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

    switch (action.type) {
		case 'LOGIN-USERS':
			_checkUserAuth(action.data);
			return newState;

		case 'LOGGED-OUT':
			_logoutUser(action.resultCode)
			return newState

		case 'USING-API':
			_loginWithAPI(action.link)
			return newState;

		case 'GET-USER-DATA':
			_setUserData(action.data)
			return newState

		case 'GET-USER-POSTS':
			_setUserPosts(action.posts)
			return newState

		case 'NEW-IMAGE':
			_saveNewImage(action.values)
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
const saveImage = (image, successUpdate) => ({type: 'NEW-IMAGE', values: {image, successUpdate}})

let saveError = error => ({type: 'ERROR', error});
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

export default userReducer;