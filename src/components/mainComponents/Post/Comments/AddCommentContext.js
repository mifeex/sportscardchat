import React from 'react';
import {connect} from 'react-redux';
import AddComment from './AddComment';
import {withAuthParams} from '../../../HOC/withAuthParams'
import {compose} from 'redux'

let addPost = () => ({type: 'ADD-COMMENT'});

const mapStateToProps = state => {
	return {}
}

export default compose(
		connect(mapStateToProps, {addPost}),
		withAuthParams,
	)(AddComment)