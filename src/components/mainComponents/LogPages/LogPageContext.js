import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux'
import LogPage from './LogPage'
import {loginUser, useDiscord} from '../../../redux/user-reducer';
import {withLoggedParams} from '../../HOC/withLoggedParams';
import {withSuccessSearching} from '../../HOC/withSuccessSearching'
import {withFetching} from '../../HOC/withFetching'

const mapStateToProps = state => {
	return {
		errorByUser: state.userdata.error,
		useLink: state.userdata.useLink,
		isResetting: state.userdata.isResetting,
	}
}

class LogPageContext extends React.Component {

	checkUser = data => {
		this.props.loginUser(data, 'check-user')
	}

	componentDidMount() {
		this.props.useDiscord();
	}

	render() {
		return (
			<div id="wrap-head">
				<LogPage {...this.props} checkUser={this.checkUser} regUser={false} />
			</div>
		)
	}
}///

export default compose(
		connect(mapStateToProps, {loginUser, useDiscord}),
		withLoggedParams,
		withSuccessSearching,
		withFetching,
	)(LogPageContext)