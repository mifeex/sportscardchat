import React from 'react';
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Field, reduxForm } from 'redux-form';
import {required, maxLengthCreator} from '../../../utils/validation/validation';
import PostBody from '../../common/AllPost/PostBody';
import YouTube from 'react-youtube';
// тупая компонента.

const maxLength = maxLengthCreator(800)
 
class Example extends React.Component {
	render() {
		const opts = {
			height: '290',
			width: '440',
			playerVars: {
				autoplay: 1,
			},
		};
	 
		return <YouTube videoId={this.props.videoId} opts={opts} onReady={this._onReady} />;
		}
 
		_onReady(event) {
			event.target.pauseVideo();
		}
}

const User = (props) => {

	const onChangePostImage = e => {
		if (e.target.files.length) {
			props.onChangeImage(e.target.files[0])
		}
	}

	return (
		<>
			<h2>User Profile</h2>
			<div className="panel">
				<div className="inner">
					<h3>{props.userData.username}</h3>
					<div>
						<div className="column1">
							<div>
								<label style={{cursor: "pointer"}} htmlFor="avatar">
									<img style={{width: "200px", height: "200px"}} 
										src={
											!!props.userData.hasImage ? 
												props.isSuccess ? 
													`${props.newImage}` : 
													`${props.userData.image}`
											: `http://localhost:4000/userPhoto/addedpic_default.jpg`
										}/>
								</label>
								{props.isAuth && props.userData.id === props.userAuthId ? 
									<input onChange={onChangePostImage} style={{display: 'none'}} type="file" id="avatar" name={"userPhoto"}/> 
									: <></>}
							</div>
						</div>

						<div className="column2">
							<dl className="details">
								{props.userData.influencer ? <><dt>INFLUENCER</dt><dd><a><FontAwesomeIcon icon={faTrophy} /></a></dd></> : <></>}
								<dt>NAME</dt><dd>{props.userData.username}</dd>
								<dt>JOINED</dt><dd>{props.userData.date}</dd>
								<dt>TOTAL POSTS</dt><dd>{props.userData.posts}</dd>
							</dl>
						</div>
					</div>
				</div>
			</div>
			<div>
				<h2>User's post</h2>
			</div>
			<div id="forumlist">
				<div id="forumlist-inner">
					<PostBody file={props.file} elements={props.userPost} hasPost={false} /> : <></>
				</div>
			</div>
			{props.userData.influencer && 
				<>
					<div>
						<h2>User's videos</h2>
					</div>
					<div id="forumlist">
						<div id="forumlist-inner">
							<Example videoId={"wcwG-pofoZk"} />
						</div>
					</div>
				</>
				}
		</>
	)
}

export default User;