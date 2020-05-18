import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux'
import {withAuthParams} from '../../HOC/withAuthParams';
import {withSuccessSearching} from '../../HOC/withSuccessSearching'
import NewPost from './newPost'
import {showPreview, showPreviewStatus, addNewPost, successPosting} from '../../../redux/newpost-reducer';
import {getCategories} from '../../../redux/categories-reducer';
import {Redirect} from 'react-router-dom';

const mapStateToProps = state => {
	return {
		preview: state.newPost.preview,
		previewText: state.newPost.previewText,
		categories: state.categories.categories,
		isAddedSuccess: state.newPost.isAddedSuccess
	}
}

class NewPostContext extends React.Component {

	componentDidMount() {
		this.props.getCategories()
	}

	addNewUserPost = data => {
		this.props.addNewPost(data)
	}

	render() {
		if (this.props.isAddedSuccess) {
			this.props.successPosting(false)
			return <Redirect to="/" />
		}
		return (
			<div id="wrap-head">
				<NewPost {...this.props} addNewUserPost={this.addNewUserPost}/>
			</div>
		)
	}
}///

export default compose(
		connect(mapStateToProps, {showPreview, showPreviewStatus, getCategories, addNewPost, successPosting}),
		withAuthParams,
		withSuccessSearching,
	)(NewPostContext)