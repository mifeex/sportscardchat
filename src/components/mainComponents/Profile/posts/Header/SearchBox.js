import React, {useEffect, useState} from 'react';
import { Field, reduxForm } from 'redux-form';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchBox = props => {

	// const [value, setQueryParam] = useState('')

	const setQueryParam = e => {
		props.setQuery(e.target.value)
		props.getQueriedPost(e.target.value, props.match.params.categoryId)
	}

	return (
		<div className="search-box" role="search">
			<form id="forum-search">
				<fieldset>
					<input className="inputbox search" value={props.query} onChange={setQueryParam} id="search_keywords" placeholder="Search this forum…" />
					<button className="button" type="submit" title="Search">
						<FontAwesomeIcon icon={faSearch} />
					</button>
				</fieldset>
			</form>
		</div>
	)
}


export default SearchBox;

// <input className="inputbox search" value={value} onChange={e => {setQueryParam(e.target.value); props.getQueriedPost(e.target.value)}} id="search_keywords" placeholder="Search this forum…" />