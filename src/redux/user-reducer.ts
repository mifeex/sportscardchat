import {getAPI} from '../api/getAPI';
import {reset} from 'redux-form';
let SET_TYPE = ''

interface userAuthData {
	isAuth: boolean;
	resultCode: number;
	email: string
}

interface getUserData {
	username: string;
	posts: number;
	influencer: number;
	image: string;
	id: number;
	hasImage: number;
	date: string
}

interface getUserPost {
	category: string;
	counts: number;
	date: string;
	id: number;
	post: string;
	postId: number;
	tag: string;
	userId: number;
	username: string;
}

interface getStringValue {
	strings?: string | null;
	type: typeof SET_TYPE;
}

interface userLog {
	email: string;
	name?: string;
	password: string;
	isStay: boolean;
}

interface response {
	resultCode: number;
	userId: number;
	email: string;
	error?: string;
}

export const setString = (strings:getStringValue) => ({type: SET_TYPE, strings})
const notString = (strings:string | undefined | null) => ({type: SET_TYPE, strings})

const initialState = {
	userAuthData: {
		isAuth: false,
		resultCode: 1,
		email: '',
	} as userAuthData,
	userData: [] as Array<getUserData>,
	userPost: [] as Array<getUserPost>,
	videoPath: [] as Array<string>,
	isAuth: false,
	successUpdate: false,
	isResetting: false,
	isSuccessChanging: false,
	error: '',
	image: '',
	useLink: '',
}

const userReducer = (state = initialState, action: any) => {

	let newState = {
		...state,
	};

	newState.userAuthData = {...state.userAuthData}

	const _checkUserAuth = (data:userAuthData) => {
		if (data.resultCode === 0) {
			newState.isAuth = true;
			newState.isSuccessChanging = false;
			newState.isResetting = false;
		}
		else {
			newState.isAuth = false;
		}

		newState.error = ''

		newState.userAuthData = data
	}

	const _logoutUser = (resultCode:number) => {
		newState.isAuth = false;
		newState.userAuthData = {
			isAuth: false,
			resultCode: 1,
			email: '',		
		};
	}

	const _loginWithAPI = (link:string) => {
		newState.useLink = link
	}

	const _saveError = (error:string) => {
		if (error !== undefined && error !== '' && error !== null) {
			newState.error = error
		}
		
		else {
			newState.error = ''
		}
	}

	const _setUserData = (data:getUserData) => {
		newState.userData = [data]
	}

	const _setUserPosts = (posts:getUserPost) => {
		newState.userPost = [posts]
	}

	const _saveNewImage = (image:string) => {
		newState.successUpdate = !newState.successUpdate
		newState.image = image
	}

	const _saveNewVideo = (path:string) => {
		newState.videoPath = [path]
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
			_saveNewImage(action.image)
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

const checkUserAuth = (resultCode:number, userId:number, email:string) => ({type: 'LOGIN-USERS', data: {resultCode, userId, email}})
const getUser = (data:getUserData) => ({type: 'GET-USER-DATA', data})
const loggedUserOut = (resultCode:number) => ({type: 'LOGGED-OUT', resultCode})
const UserPosts = (posts:getUserPost) => ({type: 'GET-USER-POSTS', posts})

export const error = (error:any) => ({type: 'GET-USER-POSTS',})
export const resetError = () => ({type: 'ERROR', error})

export const loginUser = (data:userLog, way:string) => (dispatch:Function) => {
	getAPI.postValue(data, way)
	.then((data: response) => {
		if (data.resultCode === 0) {
			const {resultCode, userId, email} = data;
			dispatch(checkUserAuth(resultCode, userId, email))
		}
	  	else {
	  		dispatch(error(data.error))
	  	}
	})
}

export const isAuth = () => (dispatch:Function) => {
	getAPI.getAuth()
	.then((data: response) => {
		if (data.resultCode === 0) {
			const { resultCode, userId, email } = data;
			dispatch(checkUserAuth(resultCode, userId, email))
		}
		else {
			dispatch(error(data.error))
		}
	})
}

export const loggedOut = () => (dispatch:Function) => {
	getAPI.getQueriedParams('logout')
	.then((data:any) => {
		dispatch(loggedUserOut(data.resultCode))
	})
}

export const useDiscord = () => (dispatch:Function) => {
	getAPI.getQueriedParams('use-discord')
	.then((data:any) => {
		SET_TYPE = "USING-API"
		dispatch(setString(data.url))
	})
}

export const redirectWithDiscord = (url:string) => (dispatch:Function) => {
	getAPI.getQueriedParams(`login${url}`)
	.then((data: response) => {
		if (data.resultCode === 0) {
			const {resultCode, userId, email} = data;
			dispatch(checkUserAuth(resultCode, userId, email))
		}
		else {
			dispatch(error(data.error))
		}
	})
}

export const getAll = (userId:number) => (dispatch:Function) => {
	getAPI.getQueriedParams(`get-user/${userId}`)
	.then((data:any) => {
			dispatch(UserPosts(data.result))
			dispatch(getUser(data.totalCount[0]))
	})
}

export const updateProfileImage = (userId:number, image:any) => (dispatch:Function) => {
	const form = new FormData();
	form.append("addedpic", image, image.name)

	getAPI.postImage(form, `update-photo/${userId}`)
	.then((data:any) => {
		if (data.resultCode === 0) {
			SET_TYPE = "NEW-IMAGE"
			dispatch(setString(data.newImage))
		}
		else {
			dispatch(error(data.error))
		}
	})
}

export const getVideoPath = (userId:number) => (dispatch:Function) => {
	getAPI.getQueriedParams(`videoPath/${userId}`)
	.then((data:any) => {
		SET_TYPE = "NEW-VIDEO"
		dispatch(setString(data.result))
	})
}

export const addYoutubeVideo = (data:any, userId:number) => (dispatch:Function) => {
	getAPI.postValue({data, userId}, `new/video`)
	.then((data:any) => {
		if (data.resultCode === 0) {
			dispatch(reset('NewVideo'))
			dispatch(resetError())
		}
		else {
			dispatch(error(data.error))
		}
	})
}

export const resetPassword = (email:string) => (dispatch:Function) => {
	getAPI.postValue(email, `password/reset`)
	.then((data:any) => {
		SET_TYPE = "RESET-CODE"
		dispatch(reset('reset'))
		dispatch(notString(null))
	})
}

export const callPassReset = (data:any) => (dispatch:Function) => {
	getAPI.postValue(data, `password/code/check`)
	.then((data:any) => {
		SET_TYPE = "SUCCESS"
		dispatch(reset('resetPassword'))
		dispatch(notString(null))
	})
}

export const next = (userId:number) => (dispatch:Function) => {
	getAPI.getQueriedParams(`videoPath/${userId}/next`)
	.then((data:any) => {
		SET_TYPE = "NEW-VIDEO"
		dispatch(setString(data.result))
	})
}

export const prew = (userId:number) => (dispatch:Function) => {
	getAPI.getQueriedParams(`videoPath/${userId}/prew`)
	.then((data:any) => {
		SET_TYPE = "NEW-VIDEO"
		dispatch(setString(data.result))
	})
}

export const setInf = (userId:number) => (dispatch:Function) => getAPI.getQueriedParams(`set/influencer/${userId}`)

export default userReducer;