import React from 'react';
import {Link} from 'react-router-dom';
// тупая компонента
const UserStats = (props) => {
  const postCount = props.count;
  const date = props.joined;
  const user = props.name;
  const userId = props.userId;

    return (
      <div className='postprofile' id="profile2">
        <dt className='noProfileRank noAvatar'>
          <div className='avatarСontainer'>
            <img className='avatarImg' 
              src={
                  !!props.hasImage ? 
                    `${props.image}`
                  : `http://localhost:4000/userPhoto/addedpic_default.jpg`
                }/>
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