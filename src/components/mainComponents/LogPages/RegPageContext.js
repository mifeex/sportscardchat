import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux'
import LogPage from './LogPage'
import {loginUser, useDiscord} from '../../../redux/user-reducer';
import {Redirect} from 'react-router-dom';
import {withLoggedParams} from '../../HOC/withLoggedParams'
import {withSuccessSearching} from '../../HOC/withSuccessSearching'
import {withFetching} from '../../HOC/withFetching'

const mapStateToProps = state => {
	return {
		errorByUser: state.userdata.error,
		useLink: state.userdata.useLink,
	}
}

class RegPageContext extends React.Component {

	registerUser = data => {
		this.props.loginUser(data, 'register-user')
	}

	componentDidMount() {
		this.props.useDiscord();
	}

	render() {
		if (this.props.isAuthUser) {
			return <Redirect to="/" />
		}

		return (
			<div id="wrap-head">
				<LogPage {...this.props} registerUser={this.registerUser} regUser={true} />
			</div>
		)
	}
}///

export default compose(
		connect(mapStateToProps, {loginUser, useDiscord}),
		withLoggedParams,
		withSuccessSearching,
		withFetching,
	)(RegPageContext)