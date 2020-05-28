import React from 'react';
import s from './comments.module.css';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import AddValueBlock from '../../../common/AllPost/addValueBlock';
import {connect} from 'react-redux';
import openSocket from 'socket.io-client'
// тупая компонента.

const socket = openSocket('https://sportscardchat.com:8000')

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

class AddComment extends React.Component {
	addPost = (e) => {
		socket.emit('comment', {message: e.message, userId: this.props.userId, postId: this.props.postId[0][0].postId})
	}

	componentDidMount() {
		socket.on('user-commented', data => {
			this.props.addPost(data[0]);
		})
	}

	render() {
		return (
			<CommentForm onSubmit={this.addPost}/>
		)
	}
}

export default AddComment;