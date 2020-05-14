import React from 'react';
import PostsContext from './posts/PostsContext'
//тупая компанента
class Profile extends React.Component {
	render() {
	    return ( 
	      <div className="content">
	        <div>
	          <PostsContext />
	        </div>
	      </div>
	    )		
	}

}

export default Profile;