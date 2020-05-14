import React from 'react';
import {connect} from 'react-redux';

const mapStateToPropsHoc = state => {
	return {
		isAuth: state.userdata.isAuth,
	}
}

export const withProfile = (Component) => {

	class ProfileComponent extends React.Component {
		render() {
			return (
				<Component {...this.props} />
			)
		}
	}

	let ConnectedProfileComponent = connect(mapStateToPropsHoc, {})(ProfileComponent)

	return ConnectedProfileComponent
}