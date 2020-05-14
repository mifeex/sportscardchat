import React from 'react';
import {Link} from 'react-router-dom';
// тупая компонента
const UserStats = (props) => {
	const avatar = props.img;
  const postCount = props.count;
  const date = props.joined;
  const user = props.name;
  const userId = props.userId;

    return (
      <div className='postprofile' id="profile2">
        <dt className='noProfileRank noAvatar'>
          <div className='avatarСontainer'>
            <img className='avatarImg' src={avatar} />
          </div>
          <Link to={`/user/${userId}`} className="username-coloured" style={{color: '#00AA00'}}>{user}</Link>
        </dt>
            
        <dd className="profile-posts">
          <strong>Posts: </strong> 
            <Link to="/user-posts">{postCount}</Link>
        </dd>
        <dd className="profile-joined">
        	<strong>Joined:</strong> {date}
        </dd>
      </div> 
  )
}

export default UserStats;