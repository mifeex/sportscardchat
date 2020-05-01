import React from 'react';
import PostsContext from './posts/PostsContext'
//тупая компанента
class Profile extends React.Component {

	constructor(props) {
		super(props)

	}

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