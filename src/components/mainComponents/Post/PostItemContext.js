import React from 'react';
import {connect} from 'react-redux';
import Comments from './Comments/Comments';
import {compose} from 'redux'
import {withProfile} from '../../HOC/withUsersData'

const mapStateToProps = state => {
	return {
		comments: state.comments,
		post: state.posts.post,
	}
}

export default compose(
		connect(mapStateToProps, {}),
		withProfile,
	)()
