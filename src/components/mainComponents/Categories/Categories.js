import React from 'react';

import {faTrophy} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Link} from 'react-router-dom';

import PostBody from '../../common/AllPost/PostBody'
import SidebarContext from '../Profile/posts/sidebar/SidebarContext';

//тупая компанента
const Categories = props => {
  let user = ''
  let date = ''
  let userId = ''
  let count = 0
  let elements = []

  if (props.influencers.length >= 1) {
    user = props.influencers[0].influencer[1].username
    date = props.influencers[0].influencer[1].date
    userId = props.influencers[0].influencer[1].id
    count = props.influencers[0].count.count
  }

  if (props.categories.length >= 1) {
    elements = props.categories[0]
  }

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
                            <Link to="/">Content Creators</Link>
                          </div>
                        </dt>
                        <dd className="posts">Total</dd>
                        <dd className="lastpost">Content Creator </dd>
                      </dl>
                    </li>
                  </ul>
                  <ul className="topiclist forums" style={{backgroundColor: '#FAFAFA'}}>
                    <li className="row">
                      <dl className="icon ">
                      <FontAwesomeIcon icon={faTrophy} />
                        <dt>
                          <div className="list-inner">
                            <Link className="forumtitle" to='/Influencers'>Content Creators</Link>
                              <div className="responsive-show"> </div>
                          </div>
                        </dt>
                        <dd className="posts">{count}</dd>
                        <dd className="lastpost">
                          <dfn>Last post</dfn>
                          <Link to={`/user/${userId}`} style={{color: '#00AA00'}} className="username-coloured"> {user}</Link>
                          <br />  
                          <strong>Joined:</strong> {date}      
                        </dd>
                      </dl>
                    </li>
                  </ul>
               </div>
              </div>
          <PostBody elements={elements} hasPost={true} />
        </div>
      </div>
    </div>
  )    
}

export default Categories;