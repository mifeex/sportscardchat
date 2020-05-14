import React from 'react';
import Post from '../../mainComponents/Profile/posts/post/post'
import {Link} from 'react-router-dom';

//тупая компанента
const PostBody = props => {

  let type = ''

  props.hasPost ? type = 'category' : type = 'post';

  return ( 
    <div className="forabg">
      <div className="inner">
        <ul className="topiclist">
          <li className="header">
            <dl className="icon">
              <dt>
                <div className="list-inner">
                  <Link to="/">All categories</Link>
                </div>
              </dt>
              <dd className="posts">{props.hasPost ? 'Posts' : 'Comments'}</dd>
              <dd className="lastpost">Last {props.hasPost ? 'post' : 'comment'} </dd>
            </dl>
          </li>
        </ul>
        <ul className="topiclist forums" style={{backgroundColor: '#FAFAFA'}}>
          {
            props.elements.map(cat => {
              return <Post
                        postBody=''
                        type={type}
                        username={cat.username}
                        tag={cat.tag}
                        date={cat.date}
                        userId={cat.userId}
                        postId={cat.postId}
                        category={cat.category}
                        key={cat.id}
                        count={cat.counts}
              />
            }) 
          }
        </ul>
     </div>
    </div>
  )    
}

export default PostBody