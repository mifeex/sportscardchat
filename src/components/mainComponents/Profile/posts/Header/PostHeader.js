import React from 'react';
import s from '../posts.module.css';
import {Link} from 'react-router-dom';
import * as axios from 'axios';
//умная компанента. Умеет отрисовывать посты. 
const PostHeader = props => {

	let pageCount = Math.ceil(props.totalPostCount / props.limit)
	let pages = []

	for (let i = 1; i <= pageCount; i++) {
		pages.push(i)
	}

	return (
		<div className="action-bar top">
			<div className="buttons">
				<Link to="" className="button1 font-icon" title="Post a new topic">
					<i className="fa fa-pencil"></i>New Topic
				</Link>
			</div>
			
			<div className="search-box" role="search">
				<form method="get" id="forum-search">
					<fieldset>
						<input className="inputbox search" type="search" id="search_keywords" placeholder="Search this forum…" />
						<button className="button" type="submit" title="Search">
							<i className="fa fa-search"></i>
						</button>
					</fieldset>
				</form>
			</div>
			
			<div className="pagination">
				{props.totalPostCount} {props.totalPostCount > 1 ? 'topics ' : 'topic '}
				• Page {
					pages.map((el, key) => {
						return <span key={key} onClick={() => {props.pageChange(el)}} className={`${props.page === el && s.strong } ${s.paginationSpan}`}>{el} </span>
					})
				}
				of <strong className={s.paginationSpan}>{pageCount}</strong>
			</div>
		</div>
	)
}


export default PostHeader;