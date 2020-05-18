import React from 'react';
import s from '../mainPostItems/post.module.css';
import UserStats from '../mainPostItems/UserStats';
import Body from '../mainPostItems/Body';
//тупая компонента.
const Comments = (props) => {

	return (
		<div className='item'>
			<div>
				{///
					props.element.map((ad, key) => {
						return (
							<div key={key}>
								<div className={s.userItem}>{
									<UserStats 
											img={ad.img}
											count={ad.count}
											joined={ad.joined}
											name={ad.username}
											key={ad.userId}
											userId={ad.userId}
											hasImage={ad.userImage}
											image={ad.image}
									/>
								}</div>

								<div className={s.bodyItem}>
									{///
										<Body 
											tag={ad.tag}
											text={ad.text}
											date={ad.date}
											inReply={props.inReply}
											key={ad.postId}
											postId={ad.postId}
											hasImage={ad.postImage}
											imageInPostId={props.imageInPostId}
										/>
									}
								</div>
							</div>
						)
					})
				}
			</div>
		</div>
	)
}

export default Comments;