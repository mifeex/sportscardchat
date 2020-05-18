import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

const mapStateToPropsHoc = state => {
	return {
		isSearchSuccess: state.search.isSearchSuccess
	}
}

export const withSuccessSearching = (Component) => {

	class SuccessSearching extends React.Component {
		render() {
			if(this.props.isSearchSuccess) {
				return <Redirect to="/search" />
			}
			return (
				<Component {...this.props} />
			)
		}
	}

	let ConnectedSuccessSearching = connect(mapStateToPropsHoc, {})(SuccessSearching)

	return ConnectedSuccessSearching
}