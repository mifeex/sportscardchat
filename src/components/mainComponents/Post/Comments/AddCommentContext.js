import React from 'react';
import {connect} from 'react-redux';
import AddComment from './AddComment';
import {withAuthParams} from '../../../HOC/withAuthParams'
import {compose} from 'redux'

let addPost = () => ({type: 'ADD-COMMENT'});
let changeArea = text => ({type: 'ADD-TEXT', text})

const mapStateToProps = state => {
	return {
		comments: state.comments,
	}
}

export default compose(
		connect(mapStateToProps, {addPost, changeArea}),
		withAuthParams,
	)(AddComment)