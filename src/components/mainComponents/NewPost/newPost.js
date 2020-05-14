import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import s from './style.module.css';
import { required, maxLengthCreator, isQute } from '../../../utils/validation/validation';
import { faBold, faItalic, faListUl, faQuoteRight, faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {connect} from 'react-redux';
import { Textarea, FieldFileInput, Input } from '../../common/FormControls/FormControls';

const maxLength = maxLengthCreator(2000);
let mousePos = null;

let AddPost = props => {

	const categories = props.categories;

	const addSubStr = (pos, elem, str) => {
		let beforeSubStr = str.substring(0, pos);
		let afterSubStr = str.substring(pos, str.length);
		let bigString = beforeSubStr+elem+afterSubStr

		return props.change('message', bigString)
	}

	const setBeautify = (element) => {
		let messageBody = '';

		if (props.message !== undefined) {
			messageBody = props.message;
			addSubStr(mousePos, element, messageBody)
		}

		if (props.message === undefined) {
			messageBody = '';
			addSubStr(mousePos, element, messageBody)
		}
		
	}

	const setQueryParam = e => {
		props.showPreviewStatus(true)
		props.showPreview(props.message)
	}

	const addBold = e => {
		setBeautify('<strong></strong>')
	}

	const addItalic = e => {
		setBeautify('<i></i>')
	}
	const addLists = e => {
		setBeautify('<ul>\n <li></li> \n</ul>')
	}
	const addQuote = e => {
		setBeautify('<q></q>')
	}
	const addLink = () => {
		setBeautify(`<a href=""></a>`)
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

				<div id="tabs" className="sub-panels" data-show-panel="" role="tablist">
					<ul style={{height: "33px"}}>
						<li onClick={addBold} id="options-panel-tab" className={`tab ${s.tab}`}>
							<button type="button" data-subpanel="options-panel" role="tab" title="Bold" aria-controls="options-panel">
								<FontAwesomeIcon icon={faBold} />
							</button>
						</li>
						<li onClick={addItalic} id="options-panel-tab" className={`tab ${s.tab}`}>
							<button type="button" data-subpanel="options-panel" role="tab" title="Italic" aria-controls="options-panel">
								<FontAwesomeIcon icon={faItalic} />
							</button>
						</li>
						<li onClick={addLists} id="options-panel-tab" className={`tab ${s.tab}`}>
							<button type="button" data-subpanel="options-panel" role="tab" title="Lists" aria-controls="options-panel">
								<FontAwesomeIcon icon={faListUl} />
							</button>
						</li>
						<li onClick={addQuote} id="options-panel-tab" className={`tab ${s.tab}`}>
							<button type="button" data-subpanel="options-panel" role="tab" title="Quote" aria-controls="options-panel">
								<FontAwesomeIcon icon={faQuoteRight} />
							</button>
						</li>
						<li onClick={addLink} id="options-panel-tab" className={`tab ${s.tab}`}>
							<button type="button" data-subpanel="options-panel" role="tab" title="Insert into 'href' value your link" aria-controls="options-panel">
								<FontAwesomeIcon icon={faLink} />
							</button>
						</li>
						<li style={{height: "33px"}} id="options-panel-tab" className={`tab ${s.tab} ${s.addPostHeader}`}>
							<Field
								name="addedpic"
								component={FieldFileInput}
								type="file"
								id="addFile"
								className={s.addPostHeader}
							/>
						</li>
					</ul>
				</div>

				<div id="message-box">
					<Field validate={[required, maxLength, isQute]}
							component={Textarea}
							id={"signature"}
							style={{height: '9em'}}
							name={"message"}
							id="message"
							className={"inputbox"}
							onKeyDown={e => mousePos = e.target.selectionStart}
					/>
				</div>
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
			form.append("tag", e.tag)			
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