import React from 'react';
import {connect} from 'react-redux';
import Sidebar from './SidebarComponents/Sidebar';
import PopularPost from './SidebarComponents/PopularPost';
import {Link} from 'react-router-dom';
import {loginUser, userName, userPass, userStay, isAuth} from '../../../../../redux/user-reducer';

class SidebarContent extends React.Component {

	constructor(props) {
		super(props)
	}

	checkUser = () => {
		
		let data = {
			name: this.props.user.email,
			password: this.props.user.pass,
		}

		this.props.loginUser(data)
	}

	componentDidMount() {
		this.props.isAuth()
	}

	render() {
		return (
			<div id="sidebar">
				{this.props.isAuthUser ?
				<div className="side-block side-login">		
					<h4 className="side-block-head">
						Welcome, <Link to={`/user/${this.props.authUser.userId}`}>
							{this.props.authUser.email}
						</Link>
					</h4> 
				</div>
				: <Sidebar {... this.props} checkUser={this.checkUser}/>}
				<PopularPost />
			</div>
		)
	}
}
///

const mapStateToProps = state => {
	return {
		user: state.userdata.userEnteredData,
		authUser: state.userdata.userAuthData,
		isAuthUser: state.userdata.isAuth,
	}
}

const SidebarContext = connect(mapStateToProps, {userName, userPass, userStay, loginUser, isAuth})(SidebarContent)

export default SidebarContext