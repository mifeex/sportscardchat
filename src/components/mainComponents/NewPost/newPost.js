import React from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import s from './style.module.css';
import { required, isQute } from '../../../utils/validation/validation';
import {connect} from 'react-redux';
import { Input } from '../../common/FormControls/FormControls';
import AddValueBlock from '../../common/AllPost/addValueBlock';

let AddPost = props => {

	const categories = props.categories;

	const setQueryParam = e => {
		props.showPreviewStatus(true)
		props.showPreview(props.message)
	}

	return (
		<form onSubmit={props.handleSubmit}>
			<fieldset className="fields1">
				<dl style={{clear: 'left'}}>
					<dt>
						<label htmlFor="tag">Add post tag</label>
					</dt>
					<dd className={s.properField}>
						<Field validate={[required, isQute]}
								component={Input}
								name="tag"
								id="tag"
								className="inputbox autowidth"
						/>
					</dd>
				</dl>
				<dl style={{clear: 'left'}}>
					<dt>
						<label htmlFor="subject">Select post category</label>
					</dt>
					<dd className={s.properField}>
						<Field component={"select"} validate={[required]} name="category">
							<option value="">Select a category...</option>
							{categories.map((category) => (

								<option value={`${category.id} ${category.category}`} key={category.id}>
									{category.category}
								</option>
							))}
						</Field>
					</dd>
				</dl>
				<strong htmlFor="message-box">Add post body</strong>
				<AddValueBlock {...props} />
			</fieldset>
			<button type="submit" className="button1">Add new post</button>
			<label type="button" onClick={setQueryParam} className={s.previewButton}>Preview</label>	
		</form>
	)
}

AddPost = reduxForm({
	form: 'add-new-post'
})(AddPost)

const selector = formValueSelector('add-new-post')

AddPost = connect(state => {
	let message = selector(state, 'message')
	const category = selector(state, 'category')
	const tag = selector(state, 'tag')
	return {
		message,
		category,
		tag
	}
})(AddPost)

const NewPost = props => {

	const form = new FormData();

	const setQueryParam = e => {
		if (e.addedpic !== undefined) {
			form.append("addedpic", e.addedpic, e.addedpic.name)
		}

		props.addNewUserPost({form, e})
	}

	return (
		<>
			<div id="subhead-title">
				<h2 className='title'>Add new post</h2>
			</div>

			<div className='chunk'>
				<div className="panel">
					<div className="inner">
						<div className={s.content}>
							<AddPost onSubmit={setQueryParam} {...props}/>
							{props.preview ? <div className={s.showPreview} style={{whiteSpace: "pre"}} dangerouslySetInnerHTML={{__html: props.previewText}}></div> : <></>}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}


export default NewPost