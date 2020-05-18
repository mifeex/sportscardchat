import React from 'react';
import {connect} from 'react-redux';
import Sidebar from './SidebarComponents/Sidebar';
import PopularPost from './SidebarComponents/PopularPost';
import {Link} from 'react-router-dom';
import {loginUser} from '../../../../../redux/user-reducer';

class SidebarContent extends React.Component {

	checkUser = (data) => {
		this.props.loginUser(data, 'check-user')
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
				<div className="side-block">
					<h4 className="side-block-head">Popular posts</h4>
						<div className="side-block-body" id="sidebar-recent-posts">
							{
								this.props.popularPost.map(cat => {
									return <PopularPost
										post={cat.post}
										username={cat.username}
										tag={cat.tag}
										userId={cat.userId}
										postId={cat.id}
										key={cat.id}
									/>
								}) 
							}
					</div>
				</div>
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
		popularPost: state.posts.popularPost,
	}
}

const SidebarContext = connect(mapStateToProps, {loginUser})(SidebarContent)

export default SidebarContext