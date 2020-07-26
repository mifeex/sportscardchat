import React from 'react';
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Field, reduxForm } from 'redux-form';
import {required, maxLengthCreator, isQute} from '../../../utils/validation/validation';
import PostBody from '../../common/AllPost/PostBody';
import YouTube from 'react-youtube';
import s from './style.module.css';
// тупая компонента.

const maxLength = maxLengthCreator(100);

let NewVideoForm = props => {
	return (
		<form onSubmit={props.handleSubmit}>
			<fieldset className="fields1">
			<dl style={{clear: 'left'}}>
					<dt>
						<Field validate={[required, isQute]}
								component="input"
								name="videoPath"
								placeholder="Enter path to your video"
								className="inputbox autowidth"
								id="username"
						/>
					</dt>
					<dt>
						<button className="button1" type="submit">Add video...</button>
					</dt>
				</dl>
			</fieldset>
		</form>
	)
}

let NewSimpleComment = props => {
	return (
		<form onSubmit={props.handleSubmit}>
			<fieldset className="fields1">
			<dl style={{clear: 'left'}}>
					<dt>
						<Field validate={[required, maxLength, isQute]}
								component="input"
								name="yourNews"
								placeholder={`Whats up ${props.name}?!`}
								className="inputbox autowidth"
								id="username"
						/>
					</dt>
					<dt>
						<button className="button1" type="submit">Share you news...</button>
					</dt>
				</dl>
			</fieldset>
		</form>
	)
}

NewSimpleComment = reduxForm({
	form: 'NewComment'
})(NewSimpleComment)

NewVideoForm = reduxForm({
	form: 'NewVideo'
})(NewVideoForm)

const User = (props) => {

	const opts = {
		height: '440',
		width: '680',
		playerVars: {
			autoplay: 1,
	}}

	const _onReady = event => {
		event.target.pauseVideo();
	}

	const onChangePostImage = e => {
		if (e.target.files.length) {
			props.onChangeImage(e.target.files[0])
		}
	}

	const addVideo = e => {
		let path = '' 
		path = e.videoPath

		props.setYoutubePath(path)
	}

	const addComment = e => {
		props.addNewComment(e.yourNews)
	}

	const setInf = () => {
		props.setInf(props.match.params.userId)
	}

	return (
		<>
			<h2 className={`login-title ${s.login}`}>User Profile</h2>
			{!!props.userData.admin && props.isAuth ? <button className="button1" onClick={setInf}>Set as influencer</button> : <></>}
				{ props.errorByUser === '' ? <></> 
					:	<div className={`error ${s.error}`}> 
							{props.errorByUser}. Please check your entered values and try again 
						</div>
				}
			<div className="panel">
				<div className="inner">
					<h3>{props.userData.username}</h3>
					<div>
						<div className="column1">
							<div>
								<label style={{cursor: "pointer"}} htmlFor="avatar">
									<img alt="avatar" style={{width: "200px", height: "200px"}} 
										src={
											!!props.userData.hasImage ? 
												props.isSuccess ? 
													`${props.newImage}` : 
													`${props.userData.image}`
											: `https://sportscardchat.com:4000/userPhoto/addedpic_default.jpg`
										}/>
								</label>
								{props.isAuth && props.userData.id === props.userAuthId ? 
									<input onChange={onChangePostImage} style={{display: 'none'}} type="file" id="avatar" name={"userPhoto"}/> 
									: <></>}
							</div>
							{
								(props.userData.influencer && props.isAuth && props.userData.id === props.userAuthId) 
								? <>
									<NewVideoForm onSubmit={addVideo} />
									<NewSimpleComment name={props.userData.username} onSubmit={addComment} />
								</>
								: <></>
							}
						</div>
						<div className="column2">
							<dl className="details">
								{props.userData.influencer ? <><dt>CONTENT CREATOR</dt><dd><a href><FontAwesomeIcon icon={faTrophy} /></a></dd></> : <></>}
								<dt>NAME</dt><dd>{props.userData.username}</dd>
								<dt>JOINED</dt><dd>{props.userData.date}</dd>
								<dt>TOTAL POSTS</dt><dd>{props.userData.posts}</dd>
							</dl>
						</div>
					</div>
				</div>
			</div>
			{
				props.userData.influencer && 
				<>
					<div>
						<h2>User comments</h2>
					</div>
					<div id="forumlist">
						<div id="forumlist-inner">
							<PostBody file={props.file} elements={props.comments} hasPost={false} /> : <></>
						</div>
					</div>
				</>
			}
			<div>
				<h2>User posts</h2>
			</div>
			<div id="forumlist">
				<div id="forumlist-inner">
					<PostBody file={props.file} elements={props.userPost} hasPost={false} /> : <></>
				</div>
			</div>
			{props.userData.influencer && 
				<>
					<div>
						<h2>User videos</h2>
					</div>

					<div id="forumlist">
						<div id="forumlist-inner" className={s.videoInner}>
							{
								props.video.map(v => <YouTube opts={opts} onReady={_onReady} videoId={v.path} key={v.id} />)
							}
						</div>
					</div>
				</>
				}
		</>
	)
}

export default User;