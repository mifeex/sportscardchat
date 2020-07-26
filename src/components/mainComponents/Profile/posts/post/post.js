import React from 'react';
import {Link} from 'react-router-dom';
import {faComment} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import s from '../posts.module.css';
//component using for some render. Here will send category and post props. We need separate it
const Post = (props) => {
  let path = ''
  let postHeader = ''
  let file = ''
  let tag = 'Empty tag'
  let postBody
  let count = 0;
  let postId = 0;

  switch(props.type) {
    case 'category':
      path = "/category/" +  props.category;
      postHeader = props.category;
      file = ''
      postBody = ''
      count = props.count
      postId = props.postId
      tag = props.tag
      break 

    case 'post':
      path = "/post/" + props.postId;
      postHeader = props.tag;
      file = props.file;
      count = props.count
      postBody = props.postBody
      postId = props.postId
      tag = props.tag
      break

    case 'comment':
      path = '';
      postHeader = '';
      file = '';
      postBody = props.postBody
      postId = 0
      tag = `${props.username} share`
      break;

    default: 
      break
  }

  return (
    <li className="row">
      <dl className="icon ">
      <FontAwesomeIcon icon={faComment} />
        <dt>
          <div className="list-inner">
            <Link className="forumtitle" to={path}>{postHeader}</Link>
              <div className="responsive-show" dangerouslySetInnerHTML={{__html: 
                postBody.length > 250 ? `${postBody.slice(0, 250)}...` : postBody}}>
              </div>
              {props.hasImage ? <Link className="forumtitle" to={path} className={s.attach}><br />Attachments</Link> : <></>}
          </div>
        </dt>
        <dd className="posts">{count}</dd>
        <dd className="lastpost">
          <dfn>Last post</dfn>
          <Link className="lastsubject" to={`/post/${postId}`}>{tag}</Link>
          <br />
            by
          <Link to={`/user/${props.userId}`} style={{color: '#00AA00'}} className="username-coloured"> {props.username}</Link>
          <br />  
          {props.date}       
        </dd>
      </dl>
    </li>
  );
}

export default Post;