import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {compose} from 'redux';

const mapStateToPropsHoc = state => {
	return {
		isAuthUser: state.userdata.isAuth,
	}
}

export const withLoggedParams = (Component) => {

	class RedirectComponent extends React.Component {
		render() {
			if (this.props.isAuthUser) this.props.history.goBack()

			return <Component {...this.props}/>	
		}
	}///

	let ConnectedRedirectComponent =  compose(
			connect(mapStateToPropsHoc, {}),
			withRouter,
		)(RedirectComponent)

	return ConnectedRedirectComponent
}