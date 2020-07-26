import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {compose} from 'redux';
import {Link} from 'react-router-dom';

import UserStats from '../../mainPostItems/UserStats';
import Body from '../../mainPostItems/Body';
import Comments from '../Comments';

const ChatWithUsers = (props:any) => {
	return (	
		<div>
			<Link to="/">&#8592; back to main page</Link>
			<div>{props.post.map((e:any, key:number) => <Comments element={e} key={key}/>)}</div>
			<div>{props.comments.map((e:any, key:number) => <Comments element={e}
					inReply={true}
			 		key={key}
			 		imageInPostId={props.match.params.postId} 
			 		/>
			 	)}</div>
		</div>
	)
}

const mapStateToProps = (state:any) => {
	return {}
}

export default compose(
		connect(mapStateToProps, {}),
		withRouter,
	)(ChatWithUsers)