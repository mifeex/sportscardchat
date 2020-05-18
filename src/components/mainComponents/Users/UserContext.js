import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux'
import {withSuccessSearching} from '../../HOC/withSuccessSearching';
import User from './User'
import {getAll, updateProfileImage} from '../../../redux/user-reducer';
import {Redirect} from 'react-router-dom';
import {withRouter} from 'react-router-dom'

const mapStateToProps = state => {
	return {
		userData: state.userdata.userData,
		userPost: state.userdata.userPost,
		isAuth: state.userdata.isAuth,
		userAuthId: state.userdata.userAuthData.userId,
		file: state.posts.file,
		isSuccess: state.userdata.successUpdate,
		newImage: state.userdata.image
	}
}

class UserContext extends React.Component {

	componentDidMount() {
		this.props.getAll(this.props.match.params.userId);
	}

	onChangeImage = image => {
		this.props.updateProfileImage(this.props.match.params.userId, image)
	}

	render() {
		return (
			<div id="wrap-head">
				<User {...this.props} onChangeImage={this.onChangeImage}/>
			</div>
		)
	}
}///

export default compose(
		connect(mapStateToProps, {getAll, updateProfileImage}),
		withRouter,
		withSuccessSearching
	)(UserContext)