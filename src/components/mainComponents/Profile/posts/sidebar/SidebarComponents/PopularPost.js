import React from 'react';
import {Link} from 'react-router-dom';
//тупая компанента.
const PopularPost = (props) => {

    return (
		<div>
			<Link className="sidebar-recent-title" to={"/post/" + props.postId}>{props.tag}</Link>
			<Link className="sidebar-recent-author" to={`/user/${props.userId}`}>{props.username}</Link>
			<div className="responsive-show" dangerouslySetInnerHTML={{__html: 
				props.post.length > 50 ? `${props.post.slice(0, 50)}...` : props.post}}>
			</div>
			<hr style={{backgroundColor: "#000"}}/>
		</div>
	)
}

export default PopularPost;