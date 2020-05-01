import React from 'react';
import Post from '../Profile/posts/post/post'
import {Link} from 'react-router-dom';
import SidebarContext from '../Profile/posts/sidebar/SidebarContext';

//тупая компанента
const Categories = props => {
  return ( 
    <div>
      <SidebarContext />
      <div id="forumlist">
        <div id="forumlist-inner">
          <div className="forabg">
            <div className="inner">
              <ul className="topiclist">
                <li className="header">
                  <dl className="icon">
                    <dt>
                      <div className="list-inner">
                        <Link to="">All categories</Link>
                      </div>
                    </dt>
                    <dd className="posts">Posts</dd>
                    <dd className="lastpost">Last post</dd>
                  </dl>
                </li>
              </ul>
              <ul className="topiclist forums" style={{backgroundColor: '#FAFAFA'}}>
                {
                  props.categories.map(cat => {
                    return <Post
                              postBody=''
                              type='category'
                              username={cat.username}
                              tag={cat.tag}
                              date={cat.date}
                              userId={cat.userId}
                              postId={cat.postId}
                              category={cat.category}
                              key={cat.id}
                              count={cat.postCount}
                    />
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

      // <div className="content">
      //   <div>
      //     <CategoryContent categories={props.categories} posts={props.posts}/>
      //   </div>
      // </div>



export default Categories;