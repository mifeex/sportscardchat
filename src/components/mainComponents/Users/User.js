import React from 'react';
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Field, reduxForm } from 'redux-form';
import {required, maxLengthCreator} from '../../../utils/validation/validation';
import PostBody from '../../common/AllPost/PostBody';
import YouTube from 'react-youtube';
// тупая компонента.

const maxLength = maxLengthCreator(800)

// const NewComment = reduxForm({
//   form: 'newComment' // a unique identifier for this form
// })(commentForm)

 
class Example extends React.Component {
	render() {
		const opts = {
			height: '390',
			width: '640',
			playerVars: {
	        // https://developers.google.com/youtube/player_parameters
				autoplay: 1,
			},
		};
	 
		return <YouTube videoId="wcwG-pofoZk" opts={opts} onReady={this._onReady} />;
		}
 
		_onReady(event) {
    // access to player in all event handlers via event.target
		event.target.pauseVideo();
	}
}


const User = (props) => {
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
									<img style={{width: "200px", height: "200px"}} src="https://sun9-3.userapi.com/c543105/v543105546/723da/BKmkn5Gar_g.jpg"/>
								</label>
								<input style={{display: 'none'}} type="file" id="avatar" />
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
					<PostBody elements={props.userPost} hasPost={false} /> : <></>
				</div>
			</div>
			{props.userData.influencer && 
				<>
					<div>
						<h2>User's videos</h2>
					</div>
					<div id="forumlist">
						<div id="forumlist-inner">
							<Example/>
							<Example/>
						</div>
					</div>
				</>
				}
		</>
	)
}

export default User;