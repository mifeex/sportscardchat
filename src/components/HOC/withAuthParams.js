import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {compose} from 'redux';

const mapStateToPropsHoc = state => {
	return {
		isAuth: state.userdata.isAuth,
	}
}

export const withAuthParams = (Component) => {

	class RedirectComponent extends React.Component {
		render() {
			if (!this.props.isAuth) this.props.history.push('/login')

			return <Component {...this.props}/>	
		}
	}

	let ConnectedRedirectComponent =  compose(
			connect(mapStateToPropsHoc, {}),
			withRouter,
		)(RedirectComponent)

	return ConnectedRedirectComponent
}