import React from 'react';
import {loggedOut} from '../../../redux/user-reducer';
import {connect} from 'react-redux';
import Navigation from './component/navigation'
import MainHeader from './component/MainHeader'
import {getQueriedParams} from '../../../redux/search-reducer'

const mapStateToProps = state => {
	return {
		isAuthUser: state.userdata.isAuth,
		userName: state.userdata.userAuthData.email,
		userId: state.userdata.userAuthData.userId,
		search: state.search.value,
	}
}

class Header extends React.Component {

	render() {
		return (
			<div id="wrap-head">
				<MainHeader />
				<Navigation {...this.props} />
			</div>
		)
	}
}

export const HeaderContext = connect(mapStateToProps, {getQueriedParams, loggedOut})(Header)

