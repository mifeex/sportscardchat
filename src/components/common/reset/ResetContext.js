import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import ResetPage from './ResetPage';
import {resetPassword, callPassReset, saveError} from '../../../redux/user-reducer.js';
import {withLoggedParams} from '../../HOC/withLoggedParams';
import {withSuccessSearching} from '../../HOC/withSuccessSearching';
import {withRouter} from 'react-router-dom';
import ResetPassword from './ResetPassword';
import {Redirect} from 'react-router-dom';

const mapStateToProps = state => {
	return {
		isResetting: state.userdata.isResetting,
		errorByUser: state.userdata.error,
		isSuccessChanging: state.userdata.isSuccessChanging
	}
}

class resetPassContext extends React.Component {

	render() {
		if (this.props.isSuccessChanging) return <Redirect to="/login" /> 

		if (!!this.props.match.params.code) return <ResetPassword {...this.props} />///
		
		return (
			<div id="wrap-head">
				<ResetPage {...this.props} callToPassResetting={this.callToPasswordReset}/>
			</div>
		)
	}
}///

export default compose(
		connect(mapStateToProps, {resetPassword, callPassReset, saveError}),
		withLoggedParams,
		withSuccessSearching,
		withRouter,
	)(resetPassContext)