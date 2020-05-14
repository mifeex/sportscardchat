import React from 'react';
import s from './comments.module.css';
import { Field, reduxForm } from 'redux-form';
import {required, maxLengthCreator} from '../../../../utils/validation/validation';
import {Textarea} from '../../../common/FormControls/FormControls';
// тупая компонента.

const maxLength = maxLengthCreator(800)

const commentForm = props => {
	return (
		<form onSubmit={props.handleSubmit}>
			<Field validate={[required, maxLength]}
					name="addComment"
					component={Textarea}
					className={`${s.newCommentBox} inputbox`}
					id='message-box'
					placeholder={'New comment'}
			/>
			<button className="button1">Add Comment</button>
		</form>
	)
}

const NewComment = reduxForm({
  form: 'newComment' // a unique identifier for this form
})(commentForm)

const AddComment = (props) => {
	let addPost = (e) => {
		props.addPost(e);
	}

	return (
		<NewComment onSubmit={addPost}/>
	)
}

export default AddComment;