import {getAPI} from '../api/getAPI';

const initialState = {
	userEnteredData: {
		email: '',
		pass: '',
		isStay: false,
	},
	userAuthData: {

	},
	isAuth: false   
}

const userReducer = (state = initialState, action) => {

	let newState = {
		...state,
	};

	newState.userEnteredData = {...state.userEnteredData};
	newState.userAuthData = {...state.userAuthData}

	const _userName = text => {
		return newState.userEnteredData.email = text
	}

	const _userPass = text => {
		return newState.userEnteredData.pass = text
	}

	const _userStay = bool => {
		return newState.userEnteredData.isStay = bool
	}

	const _checkUserAuth = (data) => {
		if (data.resultCode === 0) {
			newState.isAuth = true;
		}
		else {
			newState.isAuth = false;
		}
		return newState.userAuthData = data
	}

    switch (action.type) {
      	case 'ADD-NAME':
			_userName(action.text)
			return newState;

		case 'ADD-PASS':
			_userPass(action.text)
			return newState;

		case 'ADD-STAY':
			_userStay(action.bool)
			return newState;

		case 'CHECK-USERS':
			_checkUserAuth(action.data)
			return newState;

		default:
			return state;
    }
};

export let userName = text => ({type: 'ADD-NAME', text});
export let userPass = text => ({type: 'ADD-PASS', text});
export let userStay = bool => ({type: 'ADD-STAY', bool});
let checkUserAuth = (resultCode, userId, email) => ({type: 'CHECK-USERS', data: {resultCode, userId, email}})

export const loginUser = (data) => dispatch => {
	getAPI.postValue(data, `check-user`)
	.then(data => {
		if (data.resultCode === 0) {
			const {resultCode, userId, email} = data;

			dispatch(checkUserAuth(resultCode, userId, email))
		}
	  	else {
	  		alert(data.error)
	  	}
	})
}

export const isAuth = () => dispatch => {
	getAPI.getAuth()
	.then(data => {
		const { resultCode, userId, email } = data
	  	dispatch(checkUserAuth(resultCode, userId, email))
	})
}

export default userReducer;