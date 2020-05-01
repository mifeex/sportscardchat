import React from 'react';
import {Link} from 'react-router-dom';
//тупая компанента.
const PopularPost = (props) => {
    return (
		<div className="side-block">
			<h4 className="side-block-head">Popular posts</h4>
			<div className="side-block-body" id="sidebar-recent-posts">
				<div>
					<Link className="sidebar-recent-title" to="">BBCodes</Link>
					<span className="sidebar-recent-author">by Gramziu</span>
					<span className="sidebar-recent-content">
						Lorem ipsum dolor sit amet, consectetur adipiscin
					</span>
				</div>
			</div>
		</div>  
	)
}

export default PopularPost;