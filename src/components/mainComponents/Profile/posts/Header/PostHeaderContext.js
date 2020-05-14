import React from 'react';
import {connect} from 'react-redux';
import {getQueriedPost, setQuery} from '../../../../../redux/profile-reducer'
import SearchBox from './SearchBox'
import {compose} from 'redux'
import {withRouter} from 'react-router-dom'

const mapStateToProps = state => {
	return {
		query: state.posts.query
	}
}

class PostHeader extends React.Component {

	render() {
		return (
			<div id="wrap-head">
				<SearchBox {...this.props}/>
			</div>
		)
	}
}///

export default compose(
		connect(mapStateToProps, {getQueriedPost, setQuery}),
		withRouter,
	)(PostHeader)