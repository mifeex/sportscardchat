import React from 'react';
import {connect} from 'react-redux';
import AddComment from './AddComment';
import {withAuthParams} from '../../../HOC/withAuthParams'
import {withSuccessSearching} from '../../../HOC/withSuccessSearching'
import {addPost} from '../../../../redux/comment-reducer'
import {compose} from 'redux'

const mapStateToProps = state => {
	return {
		userId: state.userdata.userAuthData.userId,
		postId: state.comments.postData
	}
}

export default compose(
		connect(mapStateToProps, {addPost}),
		withAuthParams,
		withSuccessSearching,
	)(AddComment)