import React from 'react';
import PostBody from '../../common/AllPost/PostBody'
import {Link} from 'react-router-dom';
import SidebarContext from '../Profile/posts/sidebar/SidebarContext';
import {faTrophy} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//тупая компанента
const Categories = props => {
  let user = ''
  let date = ''
  let userId = ''
  let count = 0

  if (props.influencers !== undefined) {
    user = props.influencers[0].username
    date = props.influencers[0].date
    userId = props.influencers[0].id
    count = props.totalCount[0].count
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
                            <Link to="/">Influencers</Link>
                          </div>
                        </dt>
                        <dd className="posts">Influencers</dd>
                        <dd className="lastpost">Influencer </dd>
                      </dl>
                    </li>
                  </ul>
                  <ul className="topiclist forums" style={{backgroundColor: '#FAFAFA'}}>
                    <li className="row">
                      <dl className="icon ">
                      <FontAwesomeIcon icon={faTrophy} />
                        <dt>
                          <div className="list-inner">
                            <Link className="forumtitle" to='/Influencers'>Influencers</Link>
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
          <PostBody elements={props.categories} hasPost={true} />
        </div>
      </div>
    </div>
  )    
}

export default Categories;