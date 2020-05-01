import React from 'react';
import s from './posts.module.css';
import Post from './post/post';
import SidebarContext from './sidebar/SidebarContext';
import {Link} from 'react-router-dom';
import PostHeader from './Header/PostHeader'
//умная компанента. Умеет отрисовывать посты. 

const Posts = props => {
  return (
    <div>
      <SidebarContext />
      <div id="forumlist">
        <div id="forumlist-inner">
          <h2 className={s.info_title}>Information</h2>
          <PostHeader
              limit={props.limit} 
              totalPostCount={props.totalPostCount}
              page={props.page}
              pageChange={props.pageChange}
          />
          <div className="forabg">
            <div className="inner">
              <ul className="topiclist">
                <li className="header">
                  <dl className="icon">
                    <dt>
                      <div className="list-inner">
                        <Link to="">{window.location.pathname}</Link>
                      </div>
                    </dt>
                    <dd className="posts">Comments</dd>
                    <dd className="lastpost">Last post</dd>
                  </dl>
                </li>
              </ul>
              <ul className="topiclist forums" style={{backgroundColor: '#FAFAFA'}}>
                { 
                  props.post.map(post => {
                    return post.map(p => {
                      return <Post tag={p.tag}
                                  username={p.username}
                                  count={p.commentCount}
                                  postBody={p.post}
                                  date={p.date}
                                  key={p.id}
                                  postId={p.id}
                                  userId={p.userId}
                                  type='post'
                            />
                    })
                  }) 
                }
              </ul>
           </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Posts;