import * as React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {compose} from 'redux';
import Preloader from '../common/AllPost/preloader'

interface Props {
	isFetching: boolean
}

const mapStateToPropsHoc = (state:any) => {
	return {
		isFetching: state.categories.isFetching,
	}
}

export const withFetching = (Component:any) => {

	class FetchingComponent extends React.Component<Props, {}> {
		render() {
			if (this.props.isFetching) return <><Preloader /><Component {...this.props}/></>;

			return <Component {...this.props}/>
		}
	}

	let ConnectedFetching =  compose(
			connect(mapStateToPropsHoc, {}),
			withRouter,
		)(FetchingComponent)

	return ConnectedFetching
}