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


  switch(props.type) {
    case 'category':
      path = "/category/" +  props.category;
      postHeader = props.category;
      file = ''
      break 

    case 'post':
      path = "/post/" + props.postId;
      postHeader = props.tag;
      file = props.file
      break

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
                props.postBody.length > 250 ? `${props.postBody.slice(0, 250)}...` : props.postBody}}>
              </div>
              {props.hasImage ? <Link className="forumtitle" to={path} className={s.attach}><br />Attachments</Link> : <></>}
          </div>
        </dt>
        <dd className="posts">{props.count}</dd>
        <dd className="lastpost">
          <dfn>Last post</dfn>
          <Link className="lastsubject" to={`/post/${props.postId}`}>{props.tag}</Link>
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