import React from 'react';
import s from './posts.module.css';
import SidebarContext from './sidebar/SidebarContext';
import {Link} from 'react-router-dom';
import PostHeader from './Header/PostHeader'
import PostBody from '../../../common/AllPost/PostBody'
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
          <PostBody file={props.file} elements={props.post} hasPost={false} />
        </div>
      </div>
    </div>
  )
}

export default Posts;