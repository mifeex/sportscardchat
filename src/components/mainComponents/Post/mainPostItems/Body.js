import React from 'react';
import s from './post.module.css';
import {Link} from 'react-router-dom';
// тупая компонента
const Body = (props) => {
  const tag = props.tag;
  const text = props.text;
  const date = props.date;
  const isInReply = props.inReply;

    return (
      <div>
        <div className="postbody">
          <div id="post_content2">
            <h3 className={s.first}>
              {isInReply ?<div> In reply to: <Link to={`/post/${props.postId}`}>{tag}</Link></div> : <Link to="/">{tag}</Link>}
            </h3>
          <ul className={s.postsButtons}>
            <li>
              <Link to="/post/discussion">Reply</Link>
            </li>
          </ul>
          <p className={s.author}><Link to="/date" >{date}</Link> </p>
          <div className={s.content}>{text}</div>
        </div>
      </div>
      </div>
  )
}

export default Body;