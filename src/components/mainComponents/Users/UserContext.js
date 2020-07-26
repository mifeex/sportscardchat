import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux'
import {withSuccessSearching} from '../../HOC/withSuccessSearching';
import User from './User'
import {getAll, updateProfileImage, getVideoPath, addYoutubeVideo, next, prew, setInf, addComment, showComment} from '../../../redux/user-reducer';
import {setFetching} from '../../../redux/categories-reducer';
import {withRouter} from 'react-router-dom'
import {withFetching} from '../../HOC/withFetching'

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
		errorByUser: state.userdata.error,
		comments: state.userdata.comments
	}
}

class UserContext extends React.PureComponent {

	componentDidMount() {
		this.props.getAll(this.props.match.params.userId);
		this.props.getVideoPath(this.props.match.params.userId)
		this.props.showComment(this.props.match.params.userId)
	}

	// componentDidUpdate(prevProps) {
	// // Популярный пример (не забудьте сравнить пропсы):
	// 	if (this.props.userData.username !== prevProps.userData.username) {
	// 		this.props.setFetching(true);
	// 		this.props.getAll(this.props.match.params.userId);
	// 		this.props.getVideoPath(this.props.match.params.userId)
	// 	}
	// }
	addNewComment = value => {
		this.props.addComment(this.props.match.params.userId, value)
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
				<User {...this.props} onChangeImage={this.onChangeImage} setYoutubePath={this.setYoutubePath} addNewComment={this.addNewComment}/>
			</div>
		)
	}
}///

export default compose(
		connect(mapStateToProps, 
				{
					getAll, updateProfileImage, getVideoPath, addYoutubeVideo,
					next, prew, setInf, setFetching,
					addComment, showComment
				}),
		withRouter,
		withSuccessSearching,
		withFetching
	)(UserContext)