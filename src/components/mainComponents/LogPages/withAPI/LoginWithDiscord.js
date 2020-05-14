import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux'
import {redirectWithDiscord, isAuth} from '../../../../redux/user-reducer';
import {Redirect} from 'react-router-dom';
import {withRouter} from 'react-router-dom'

const mapStateToProps = state => {
	return {
		isAuthUser: state.userdata.isAuth,
		error: state.userdata.error,
	}
}

class LoginWithDiscord extends React.Component {

	componentDidMount() {
		this.props.isAuth();
		this.props.redirectWithDiscord(this.props.location.search)
	}

	render() {
		if (this.props.isAuthUser) {
			return <Redirect to="/" />
		}

		else {
			return <Redirect to="/login" />
		}
	}
}///

export default compose(
		connect(mapStateToProps, {redirectWithDiscord, isAuth}),
		withRouter,
	)(LoginWithDiscord)