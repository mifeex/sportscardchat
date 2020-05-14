import React from 'react'
import s from '../Header.module.css';
import MenuBar from './menu';
import { Field, reduxForm } from 'redux-form'
import {required} from '../../../../utils/validation/validation'
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchForm = props => {
	return (
		<form onSubmit={props.handleSubmit}>
			<fieldset>
				<Field validate={[required]}
						component="input"
						name="searc"
						type="search"
						placeholder="Search"
				/>
				<button type="submit">
					<FontAwesomeIcon icon={faSearch} />
				</button>
			</fieldset>
		</form>
	)
}

const HeaderSearchForm = reduxForm({form: 'search'})(SearchForm)

const Navigation = props => {

	const setValue = e => {
		console.log(e)
		props.getQueriedParams(e)
	}

	return (
		<div id="site-nav" role="navigation">
			<div className={s.chunkNav}>
				<div className="site-nav">
					<div id="site-search" role="search">
						<HeaderSearchForm onSubmit={setValue} />
					</div>
					<MenuBar userName={props.userName}
							isAuth={props.isAuthUser}
							userId={props.userId}
							loggedOut={props.loggedOut}
					/>
				</div>
			</div>
		</div>
	)
}

export default Navigation