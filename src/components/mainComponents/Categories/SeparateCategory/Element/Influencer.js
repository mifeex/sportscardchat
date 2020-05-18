import React from 'react';
import {Link} from 'react-router-dom';
import {faTrophy} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Influencer = props => {

	return (	
		<li className="row">
			<dl className="icon ">
				<FontAwesomeIcon icon={faTrophy} />
				<dt>
					<div className="list-inner">
						<Link className="forumtitle" to={`/user/${props.userId}`}>{props.user}</Link>
						<div className="responsive-show"> </div>
					</div>
				</dt>
				<dd className="lastpost">
					<dfn>Last post</dfn>
					<strong style={{color: '#00AA00'}} className="username-coloured"> 
						Joined: {props.date}
					</strong>
					<br />  
				</dd>
			</dl>
		</li>
	)
}

export default Influencer