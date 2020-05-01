import React from 'react';
import {connect} from 'react-redux';
import Comments from './Comments';
import {withProfile} from '../../../HOC/withUsersData'
import {compose} from 'redux'

const mapStateToProps = state => {
	return {
		comments: state.comments,
	}
}

export default compose(
		connect(mapStateToProps, {}),
		withProfile,
	)(Comments)