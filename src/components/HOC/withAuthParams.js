import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

const mapStateToPropsHoc = state => {
	return {
		isAuth: state.userdata.isAuth,
	}
}

export const withAuthParams = (Component) => {

	class RedirectComponent extends React.Component {
		render() {
			if (!this.props.isAuth) return <Redirect to="/login" />

			return <Component {...this.props}/>	
		}
	}

	let ConnectedRedirectComponent = connect(mapStateToPropsHoc, {})(RedirectComponent)

	return ConnectedRedirectComponent
}