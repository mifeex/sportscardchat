import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux'
import {withSuccessSearching} from '../../HOC/withSuccessSearching';
import User from './User'
import {getAll, updateProfileImage, getVideoPath, addYoutubeVideo, next, prew, setInf} from '../../../redux/user-reducer';
import {withRouter} from 'react-router-dom'

const mapStateToProps = state => {
	return {
		userData: state.userdata.userData,
		userPost: state.userdata.userPost,
		isAuth: state.userdata.isAuth,
		userAuthId: state.userdata.userAuthData.userId,
		file: state.posts.file,
		isSuccess: state.userdata.successUpdate,
		newImage: state.userdata.image,
		video: state.userdata.videoPath,
		errorByUser: state.userdata.error
	}
}

class UserContext extends React.Component {

	shouldComponentUpdate(nextProps, nextState) {
		return nextProps !== this.props || nextState !== this.state
	}

	componentDidMount() {
		this.props.getAll(this.props.match.params.userId);
		this.props.getVideoPath(this.props.match.params.userId)
	}

	onChangeImage = image => {
		this.props.updateProfileImage(this.props.match.params.userId, image)
	}

	setYoutubePath = path => {
		this.props.addYoutubeVideo(path, this.props.userAuthId)
	}

	render() {
		return (
			<div id="wrap-head">
				<User {...this.props} onChangeImage={this.onChangeImage} setYoutubePath={this.setYoutubePath}/>
			</div>
		)
	}
}///

export default compose(
		connect(mapStateToProps, {getAll, updateProfileImage, getVideoPath, addYoutubeVideo, next, prew, setInf}),
		withRouter,
		withSuccessSearching
	)(UserContext)