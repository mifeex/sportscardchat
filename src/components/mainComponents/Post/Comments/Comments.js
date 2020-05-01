import React from 'react';
import s from '../mainPostItems/post.module.css';
import {Link} from 'react-router-dom';
import UserStats from '../mainPostItems/UserStats'; // удалить в обязательном порядке!
import Body from '../mainPostItems/Body'; // удалить в обязательном порядке!
//тупая компонента.
const Comments = (props) => {

	const userData = props.comments.userData;
	const commentsData = props.comments.commentsData;

    return (
    	<div className='item'>
	    	<Link to="/">&#8592; back to main page</Link>
	        <div>

		        <div className={s.userItem}>
			        {///
			          userData.map(ud => {
			            return (
							<UserStats img={ud.img}
									count={ud.count}
									joined={ud.joined} 
									name={ud.name}
									id={ud.id}
									key={ud.id}
				            />
			            )
			          }) 
			        }
			    </div>

			    <div className={s.bodyItem}>
			        {///
			          commentsData.map(cd => {
			            return (
							<Body tag={cd.tag}
								text={cd.text} 
								date={cd.date}
								inReply={cd.inReply}
								key={cd.id}
								postId={cd.id}
							/>            	
			            )
			          }) 
			        }
			    </div>
	        </div>    
        </div>
  	)
}

export default Comments;