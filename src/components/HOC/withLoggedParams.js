import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

const mapStateToPropsHoc = state => {
	return {
		isAuthUser: state.userdata.isAuth,
	}
}

export const withLoggedParams = (Component) => {

	class RedirectComponent extends React.Component {
		render() {
			if (this.props.isAuthUser) return <Redirect to="/" />

			return <Component {...this.props}/>	
		}
	}

	let ConnectedRedirectComponent = connect(mapStateToPropsHoc, {})(RedirectComponent)

	return ConnectedRedirectComponent
}