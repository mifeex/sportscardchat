import React, { useEffect, useRef } from 'react'
import s from './comments.module.css';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import AddValueBlock from '../../../common/AllPost/addValueBlock';
import {connect} from 'react-redux';
import openSocket from 'socket.io-client'
// тупая компонента.

const socket = openSocket('https://sportscardchat.com:8000/')

let CommentForm = props => {
	return (
		<form onSubmit={props.handleSubmit}>
			<fieldset className="fields1">
				<AddValueBlock {...props} comment={true} />
				<button className="button1">Add Comment</button>
			</fieldset>
		</form>
	)
}///

CommentForm = reduxForm({
	form: 'NewComment'
})(CommentForm)

const selector = formValueSelector('NewComment')

CommentForm = connect(state => {
	let message = selector(state, 'message')
	return {
		message,
	}
})(CommentForm)

const AddComment = props => {

	const messagesEndRef = useRef(null)

	const scrollToBottom = () => {
		messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
	}

	useEffect(scrollToBottom, [props]);

	const addComment = (e) => {
		socket.emit('comment', {message: e.message, userId: props.userId, postId: props.postId[0][0].postId})
	}

	socket.on('user-commented', data => {
		props.addPost(data[0]);
	})

	return (
		<div ref={messagesEndRef}>
			<CommentForm {...props} onSubmit={addComment}/>
		</div>
	)
}

export default AddComment;