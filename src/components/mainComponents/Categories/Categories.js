import React from 'react';
import PostBody from '../../common/AllPost/PostBody'
import {Link} from 'react-router-dom';
import SidebarContext from '../Profile/posts/sidebar/SidebarContext';

//тупая компанента
const Categories = props => {
  return ( 
    <div>
      <SidebarContext />
      <div id="forumlist">
        <div id="forumlist-inner">
          <PostBody elements={props.categories} hasPost={true} />
        </div>
      </div>
    </div>
  )    
}

export default Categories;