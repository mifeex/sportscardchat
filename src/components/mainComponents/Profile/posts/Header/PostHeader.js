import React from 'react';
import s from '../posts.module.css';
import {Link} from 'react-router-dom';
import PostHeaderContext from './PostHeaderContext';
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
				<Link to="/post/new" className="button1 font-icon">
					<FontAwesomeIcon icon={faPencilAlt} /> New Topic
				</Link>
			</div>
			
			<PostHeaderContext />

			<div className="pagination">
				{props.totalPostCount} {props.totalPostCount > 1 ? 'topics ' : 'topic '}
				• Page {
					pages.map((el, key) => {
						return <button key={key} onClick={() => {props.pageChange(el)}} className={`${props.page === el && s.strong } ${s.paginationSpan}`}>{el}</button>
					})
				}
				of <strong className={s.paginationSpan}>{pageCount}</strong>
			</div>
		</div>
	)
}


export default PostHeader;